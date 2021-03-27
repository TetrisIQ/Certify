package de.tetrisiq.certify.app.controller;

import de.tetrisiq.certify.app.config.UserService;
import de.tetrisiq.certify.app.model.Report;
import de.tetrisiq.certify.app.repository.ReportRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@Log4j2
public class ReportController {

    private UserService userService;
    private ReportRepository reportRepository;

    @Autowired
    public ReportController(UserService userService, ReportRepository reportRepository) {
        this.userService = userService;
        this.reportRepository = reportRepository;

    }


    @GetMapping("/api/verify/{hash}")
    public String getVerifyToken(@PathVariable String hash) {
        Optional<Report> report = reportRepository.findById(hash);
        if (report.isPresent()) {
            return report.get().getVerifyToken();
        }
        return "Unknown hash!";
    }

    @PostMapping("/api/{hash}")
    public Report createReport(@PathVariable String hash) {
        Optional<Report> reportOptional = reportRepository.findById(hash);
        if (reportOptional.isPresent()) {
            // same hash value exists in database!
            log.info("Report with hash: {} exists in Database. Returning the Old Verify Token!", hash);
            return reportOptional.get();
        }
        Report report = new Report(hash);
        reportRepository.save(report);
        return report;
    }

}
