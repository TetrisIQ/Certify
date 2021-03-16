package de.tetrisiq.certify.controller;

import de.tetrisiq.certify.config.UserService;
import de.tetrisiq.certify.model.Report;
import de.tetrisiq.certify.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5500")
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
        Report report = reportRepository.getOne(hash);
        if(report != null) {
            return report.getVerifyToken();
        }
        return "";
    }

    @PostMapping("/api/{hash}")
    public Report createReport(@PathVariable String hash) {
        Report report = new Report(hash);
        reportRepository.save(report);
        return report;
    }

}
