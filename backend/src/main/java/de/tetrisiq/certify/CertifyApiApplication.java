package de.tetrisiq.certify;

import de.tetrisiq.certify.config.WebSecurityConfig;
import de.tetrisiq.certify.model.User;
import de.tetrisiq.certify.repository.UserRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;

@SpringBootApplication
public class CertifyApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(CertifyApiApplication.class, args);
    }


    @Component
    private class StartupRunner implements CommandLineRunner {

        private UserRepository userRepository;
        private WebSecurityConfig webSecurityConfig;

        @Autowired
        StartupRunner(UserRepository userRepository, WebSecurityConfig webSecurityConfig) {
            this.userRepository = userRepository;
            this.webSecurityConfig = webSecurityConfig;
        }

        @Override
        public void run(String... args) {
            if (userRepository.findAll().size() == 0) {
                User user = new User();
                user.setPasswordHash(webSecurityConfig.passwordEncoder().encode("MyStandartPassword"));
                user.setUsername("TetrisIQ");
                user.setRole("ADMIN");
				System.out.println("SAVE");
				userRepository.save(user);
            }
        }

    }


}
