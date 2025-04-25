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

    @Autowired
    private AuthenticationManager authenticationManager;

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
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new JacksonFactory())
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
            String pictureUrl = (String) payload.get("picture");
            String googleId = payload.getSubject();

            // Check if user exists by email
            User user = userRepository.findByEmail(email).orElse(null);
            if (user == null) {
                // Create a new user
                String username = email.split("@")[0] + "_" + UUID.randomUUID().toString().substring(0, 8);
                String randomPassword = UUID.randomUUID().toString();
                user = new User(username, email, passwordEncoder.encode(randomPassword));
                
                // Assign default role (USER)
                Set<Role> roles = new HashSet<>();
                Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                        .orElseThrow(() -> new RuntimeException("Error: Role not found."));
                roles.add(userRole);
                user.setRoles(roles);
                
                // Save user
                userRepository.save(user);
            }

            // Create authentication token
            String jwt = jwtUtils.generateJwtToken(user.getUsername());
            
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
            return ResponseEntity.badRequest().body("Error verifying Google token: " + e.getMessage());
        }
    }
}