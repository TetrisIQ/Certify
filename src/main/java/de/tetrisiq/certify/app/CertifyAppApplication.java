package de.tetrisiq.certify.app;

import de.tetrisiq.certify.app.config.WebSecurityInterface;
import de.tetrisiq.certify.app.model.Report;
import de.tetrisiq.certify.app.model.UserModel;
import de.tetrisiq.certify.app.repository.ReportRepository;
import de.tetrisiq.certify.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.thymeleaf.ThymeleafProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.thymeleaf.templateresolver.FileTemplateResolver;
import org.thymeleaf.templateresolver.ITemplateResolver;

@SpringBootApplication
public class CertifyAppApplication {
	@Autowired
	private ThymeleafProperties properties;

	@Value("${spring.thymeleaf.templates_root:}")
	private String templatesRoot;

	public static void main(String[] args) {
		SpringApplication.run(CertifyAppApplication.class, args);
	}

	@Bean
	@Profile("local")
	public ITemplateResolver defaultTemplateResolver() {
		FileTemplateResolver resolver = new FileTemplateResolver();
		resolver.setSuffix(properties.getSuffix());
		resolver.setPrefix(templatesRoot);
		resolver.setTemplateMode(properties.getMode());
		resolver.setCacheable(properties.isCache());
		return resolver;
	}


	@Component
	private class StartupRunner implements CommandLineRunner {

		private UserRepository userRepository;
		private WebSecurityInterface webSecurityInterface;
		private ReportRepository reportRepository;

		@Autowired
		StartupRunner(UserRepository userRepository, WebSecurityInterface webSecurityInterface, ReportRepository reportRepository) {
			this.userRepository = userRepository;
			this.webSecurityInterface = webSecurityInterface;
			this.reportRepository = reportRepository;
		}

		@Override
		public void run(String... args) {
			if (userRepository.findAll().size() == 0) {
				// Insert default user
				UserModel user = new UserModel();
				user.setPasswordHash(webSecurityInterface.passwordEncoder().encode("admin"));
				user.setUsername("admin");
				user.setRole("ADMIN");
				userRepository.save(user);
				// Insert example data
				String hash = "1dccad3fad058a29ccef8e003fa71bbabf587431ac5a55fb36268bf7958c5f3cb31116ac9e855ec61bb9b72ecbd484f704bee032707fb0ead24ad2bee97b9a39";
				Report report = new Report(hash);
				report.setVerifyToken("dbb5e2a8");
				reportRepository.save(report);
			}
		}

	}

}
