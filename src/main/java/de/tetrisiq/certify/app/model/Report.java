package de.tetrisiq.certify.app.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Report {

    @Id
    private String hash;
    private String verifyToken;

    public Report(String hash) {
        this.hash = hash;
        this.verifyToken = generateVerifyToken();
    }

    public void setVerifyToken(String verifyToken) {
        this.verifyToken = verifyToken;
    }

    private String generateVerifyToken() {
        return UUID.randomUUID().toString().split("-")[0].toLowerCase();
    }
}
