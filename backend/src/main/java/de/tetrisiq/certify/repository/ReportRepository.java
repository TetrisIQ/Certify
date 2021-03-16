package de.tetrisiq.certify.repository;

import de.tetrisiq.certify.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, String> {
}
