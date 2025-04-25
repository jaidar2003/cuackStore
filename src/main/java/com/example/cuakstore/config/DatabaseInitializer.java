package com.example.cuakstore.config;

import com.example.cuakstore.model.ERole;
import com.example.cuakstore.model.Role;
import com.example.cuakstore.model.User;
import com.example.cuakstore.repository.RoleRepository;
import com.example.cuakstore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Random;
import java.util.Set;
import java.util.UUID;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Initialize roles
        initRoles();

        // Initialize admin user
        initAdminUser();

        // Initialize owner user
        initOwnerUser();
    }

    private void initRoles() {
        // Check if roles already exist
        if (roleRepository.count() == 0) {
            // Create roles
            Role userRole = new Role(ERole.ROLE_USER);
            Role adminRole = new Role(ERole.ROLE_ADMIN);
            Role ownerRole = new Role(ERole.ROLE_OWNER);

            // Save roles
            roleRepository.save(userRole);
            roleRepository.save(adminRole);
            roleRepository.save(ownerRole);

            System.out.println("Roles initialized successfully");
        }
    }

    @Autowired
    private Environment env;

    private void initAdminUser() {
        // Get admin credentials from environment variables or use defaults only for development
        String adminUsername = env.getProperty("ADMIN_USERNAME", "admin_" + UUID.randomUUID().toString().substring(0, 8));
        String adminEmail = env.getProperty("ADMIN_EMAIL", "admin@cuakstore.com");
        String adminPassword = env.getProperty("ADMIN_PASSWORD");

        // If no password is provided in environment, generate a strong random password
        if (adminPassword == null || adminPassword.isEmpty()) {
            adminPassword = generateStrongPassword();
            // Log the generated password only during development
            if (env.getActiveProfiles().length == 0 || Arrays.asList(env.getActiveProfiles()).contains("dev")) {
                System.out.println("Generated admin password: " + adminPassword);
            }
        }

        // Check if admin user already exists
        if (!userRepository.existsByUsername(adminUsername)) {
            // Create admin user
            User adminUser = new User(adminUsername, adminEmail, passwordEncoder.encode(adminPassword));

            // Assign admin role
            Set<Role> roles = new HashSet<>();
            Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                    .orElseThrow(() -> new RuntimeException("Error: Admin Role not found."));
            roles.add(adminRole);
            adminUser.setRoles(roles);

            // Save admin user
            userRepository.save(adminUser);

            System.out.println("Admin user initialized successfully with username: " + adminUsername);
        }
    }

    private void initOwnerUser() {
        // Get owner credentials from environment variables or use defaults only for development
        String ownerUsername = env.getProperty("OWNER_USERNAME", "owner_" + UUID.randomUUID().toString().substring(0, 8));
        String ownerEmail = env.getProperty("OWNER_EMAIL", "owner@cuakstore.com");
        String ownerPassword = env.getProperty("OWNER_PASSWORD");

        // If no password is provided in environment, generate a strong random password
        if (ownerPassword == null || ownerPassword.isEmpty()) {
            ownerPassword = generateStrongPassword();
            // Log the generated password only during development
            if (env.getActiveProfiles().length == 0 || Arrays.asList(env.getActiveProfiles()).contains("dev")) {
                System.out.println("Generated owner password: " + ownerPassword);
            }
        }

        // Check if owner user already exists
        if (!userRepository.existsByUsername(ownerUsername)) {
            // Create owner user
            User ownerUser = new User(ownerUsername, ownerEmail, passwordEncoder.encode(ownerPassword));

            // Assign owner role
            Set<Role> roles = new HashSet<>();
            Role ownerRole = roleRepository.findByName(ERole.ROLE_OWNER)
                    .orElseThrow(() -> new RuntimeException("Error: Owner Role not found."));
            roles.add(ownerRole);
            ownerUser.setRoles(roles);

            // Save owner user
            userRepository.save(ownerUser);

            System.out.println("Owner user initialized successfully with username: " + ownerUsername);
        }
    }

    /**
     * Generates a strong random password
     * @return A strong password with at least 12 characters including uppercase, lowercase, numbers, and special characters
     */
    private String generateStrongPassword() {
        String upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String lowerChars = "abcdefghijklmnopqrstuvwxyz";
        String numbers = "0123456789";
        String specialChars = "!@#$%^&*()_-+=<>?";
        String allChars = upperChars + lowerChars + numbers + specialChars;

        Random random = new SecureRandom();
        StringBuilder password = new StringBuilder();

        // Ensure at least one character from each category
        password.append(upperChars.charAt(random.nextInt(upperChars.length())));
        password.append(lowerChars.charAt(random.nextInt(lowerChars.length())));
        password.append(numbers.charAt(random.nextInt(numbers.length())));
        password.append(specialChars.charAt(random.nextInt(specialChars.length())));

        // Add remaining characters
        for (int i = 0; i < 8; i++) {
            password.append(allChars.charAt(random.nextInt(allChars.length())));
        }

        // Shuffle the password
        char[] passwordArray = password.toString().toCharArray();
        for (int i = 0; i < passwordArray.length; i++) {
            int j = random.nextInt(passwordArray.length);
            char temp = passwordArray[i];
            passwordArray[i] = passwordArray[j];
            passwordArray[j] = temp;
        }

        return new String(passwordArray);
    }
}
