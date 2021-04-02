package de.tetrisiq.certify.app.integration;

import de.tetrisiq.certify.app.QRCodeReader;
import de.tetrisiq.certify.app.SeleniumParent;
import de.tetrisiq.certify.app.TestConstants;
import junitparams.FileParameters;
import junitparams.JUnitParamsRunner;
import lombok.SneakyThrows;
import org.apache.commons.lang3.tuple.Pair;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openqa.selenium.By;
import org.openqa.selenium.OutputType;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;

@RunWith(JUnitParamsRunner.class)
public class ReportTest extends SeleniumParent {


    @Test
    @FileParameters("src/test/resources/ReportParamsTestParameters.csv")
    public void addMultipleReports(String name, String organisation, String text, String... grades) {
        Map<String, String> gradesMap = new HashMap<>();
        for (int i = 0; i < grades.length; i++) {
            gradesMap.put(grades[i], grades[++i]);
        }
        addReport(name, organisation, text, gradesMap);
    }

    @SneakyThrows
    private void verifyReport(Pair<String, String> report) {
        driver().navigate().to(QRCodeReader.readQRCode(report.getRight()));
        driver().findElement(By.cssSelector("#btn-verify")).click();
        Thread.currentThread().sleep(1000);
        assertEquals(report.getLeft(), driver().findElement(By.cssSelector("#verifyToken")).getText());
    }

    private void addReport(String name, String organisation, String text, Map<String, String> grades) {
        if (!super.isLoggedIn()) super.login();
        if (!driver().getCurrentUrl().equals(TestConstants.NEW_URL)) driver().navigate().to(TestConstants.NEW_URL);
        insertName(name);
        insertOrganisation(organisation);
        insertGrades(grades);
        insertText(text);
        verifyReport(clickOnGenerate());
    }


    @SneakyThrows
    private Pair<String, String> clickOnGenerate() {
        driver().findElement(By.cssSelector("#new > div > div.row > div.col.text-right > button")).click();
        Thread.currentThread().sleep(1000);
        String verifyToken = driver().findElement(By.cssSelector("#verify-token")).getText();
        String url = driver().findElement(By.cssSelector("#qr-code > canvas")).getScreenshotAs(OutputType.BASE64);
        if(verifyToken.equals("") || url.equals("")) fail();
        return Pair.of(verifyToken, url);

    }

    private void insertName(String name) {
        driver().findElement(By.cssSelector("#name")).sendKeys(name);
    }

    private void insertOrganisation(String organisation) {
        driver().findElement(By.cssSelector("#organisation")).sendKeys(organisation);
    }

    private void insertGrades(Map<String, String> grades) {
        AtomicInteger row = new AtomicInteger(1);
        for (int i = 1; i < grades.size(); i++) {
            driver().findElement(By.cssSelector("#table > tbody > tr:nth-child(" + i + ") > td:nth-child(3) > button")).click();
        }
        grades.forEach((k, v) -> {
            // insert module
            driver().findElement(By.cssSelector("#table > tbody > tr:nth-child(" + row + ") > td:nth-child(1) > input")).sendKeys(k);
            // insert grade
            driver().findElement(By.cssSelector("#table > tbody > tr:nth-child(" + row + ") > td:nth-child(2) > input")).sendKeys(v);
            row.getAndIncrement();
        });
    }

    private void insertText(String text) {
        driver().findElement(By.cssSelector("#text")).sendKeys(text);
    }


}
