package de.tetrisiq.certify.app.repository;

import de.tetrisiq.certify.app.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, String> {
}
