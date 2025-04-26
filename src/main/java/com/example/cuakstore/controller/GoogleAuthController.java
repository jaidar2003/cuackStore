package com.example.cuakstore.controller;

import com.example.cuakstore.model.ERole;
import com.example.cuakstore.model.Role;
import com.example.cuakstore.model.User;
import com.example.cuakstore.payload.request.GoogleAuthRequest;
import com.example.cuakstore.payload.response.JwtResponse;
import com.example.cuakstore.repository.RoleRepository;
import com.example.cuakstore.repository.UserRepository;
import com.example.cuakstore.security.jwt.JwtUtils;
import com.example.cuakstore.security.services.UserDetailsImpl;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken; // Import this
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class GoogleAuthController {

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;

    // AuthenticationManager might not be strictly needed for this flow if you don't authenticate via username/password
    // @Autowired
    // private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/google")
    public ResponseEntity<?> authenticateWithGoogle(@RequestBody GoogleAuthRequest authRequest) {
        try {
            // Verify the Google ID token
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), JacksonFactory.getDefaultInstance()) // Use default JacksonFactory instance
                    .setAudience(Collections.singletonList(googleClientId))
                    .build();

            GoogleIdToken idToken = verifier.verify(authRequest.getCredential());
            if (idToken == null) {
                return ResponseEntity.badRequest().body("Invalid Google ID token");
            }

            // Get user information from the token
            Payload payload = idToken.getPayload();
            String email = payload.getEmail();
            String name = (String) payload.get("name");
            // String pictureUrl = (String) payload.get("picture"); // Available if needed
            // String googleId = payload.getSubject(); // Available if needed

            // Check if user exists by email, or create a new one
            User user = userRepository.findByEmail(email).orElseGet(() -> {
                // Create a new user if not found
                String username = email.split("@")[0] + "_" + UUID.randomUUID().toString().substring(0, 8);
                // Generate a secure random password (OAuth users might not need a traditional password)
                String randomPassword = UUID.randomUUID().toString();
                User newUser = new User(username, email, passwordEncoder.encode(randomPassword));

                // Assign default role (USER)
                Set<Role> roles = new HashSet<>();
                Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                        .orElseThrow(() -> new RuntimeException("Error: Role not found."));
                roles.add(userRole);
                newUser.setRoles(roles);

                // Save new user
                return userRepository.save(newUser);
            });

            // --- Start of changes ---
            // Create UserDetails for the authenticated user
            // Ensure UserDetailsImpl has a static build(User user) method or adjust accordingly
            UserDetailsImpl userDetails = UserDetailsImpl.build(user);

            // Create Authentication object using UserDetails
            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities());

            // Optionally set the authentication in the security context
            // SecurityContextHolder.getContext().setAuthentication(authentication);

            // Generate JWT token using the Authentication object
            String jwt = jwtUtils.generateJwtToken(authentication);
            // --- End of changes ---

            // Get user roles
            List<String> roles = user.getRoles().stream()
                    .map(role -> role.getName().name())
                    .collect(Collectors.toList());

            // Return JWT response
            return ResponseEntity.ok(new JwtResponse(
                    jwt,
                    user.getId(),
                    user.getUsername(),
                    user.getEmail(),
                    roles));

        } catch (GeneralSecurityException | IOException e) {
            // Log the exception for better debugging
            // logger.error("Error verifying Google token", e);
            return ResponseEntity.status(500).body("Error verifying Google token: " + e.getMessage());
        } catch (RuntimeException e) {
            // Catch potential RuntimeExceptions like "Role not found"
            // logger.error("Error during Google authentication", e);
            return ResponseEntity.status(500).body("An internal error occurred: " + e.getMessage());
        }
    }
}