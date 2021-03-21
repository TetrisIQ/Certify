package de.tetrisiq.certify.app;

import de.tetrisiq.certify.app.config.WebSecurityConfig;
import de.tetrisiq.certify.app.model.Report;
import de.tetrisiq.certify.app.model.User;
import de.tetrisiq.certify.app.repository.ReportRepository;
import de.tetrisiq.certify.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;

@SpringBootApplication
public class CertifyAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(CertifyAppApplication.class, args);
	}

	@Component
	private class StartupRunner implements CommandLineRunner {

		private UserRepository userRepository;
		private WebSecurityConfig webSecurityConfig;
		private ReportRepository reportRepository;

		@Autowired
		StartupRunner(UserRepository userRepository, WebSecurityConfig webSecurityConfig, ReportRepository reportRepository) {
			this.userRepository = userRepository;
			this.webSecurityConfig = webSecurityConfig;
			this.reportRepository = reportRepository;
		}

		@Override
		public void run(String... args) {
			if (userRepository.findAll().size() == 0) {
				// Insert default user
				User user = new User();
				user.setPasswordHash(webSecurityConfig.passwordEncoder().encode("admin"));
				user.setUsername("admin");
				user.setRole("ADMIN");
				userRepository.save(user);
				// Insert example data
				String hash = "";
				Report report = new Report(hash);
			}
		}

	}

}
