package com.example.cuakstore.config;

import com.example.cuakstore.model.ERole;
import com.example.cuakstore.model.Role;
import com.example.cuakstore.model.User;
import com.example.cuakstore.repository.RoleRepository;
import com.example.cuakstore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

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

    private void initAdminUser() {
        // Check if admin user already exists
        if (!userRepository.existsByUsername("admin")) {
            // Create admin user
            User adminUser = new User("admin", "admin@cuakstore.com", passwordEncoder.encode("admin123"));

            // Assign admin role
            Set<Role> roles = new HashSet<>();
            Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                    .orElseThrow(() -> new RuntimeException("Error: Admin Role not found."));
            roles.add(adminRole);
            adminUser.setRoles(roles);

            // Save admin user
            userRepository.save(adminUser);

            System.out.println("Admin user initialized successfully");
        }
    }

    private void initOwnerUser() {
        // Check if owner user already exists
        if (!userRepository.existsByUsername("owner")) {
            // Create owner user
            User ownerUser = new User("owner", "owner@cuakstore.com", passwordEncoder.encode("owner123"));

            // Assign owner role
            Set<Role> roles = new HashSet<>();
            Role ownerRole = roleRepository.findByName(ERole.ROLE_OWNER)
                    .orElseThrow(() -> new RuntimeException("Error: Owner Role not found."));
            roles.add(ownerRole);
            ownerUser.setRoles(roles);

            // Save owner user
            userRepository.save(ownerUser);

            System.out.println("Owner user initialized successfully");
        }
    }
}