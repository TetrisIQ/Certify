package de.tetrisiq.certify.app.config;

import org.springframework.security.crypto.password.PasswordEncoder;

public interface WebSecurityInterface {
    PasswordEncoder passwordEncoder();
}
