package de.tetrisiq.certify.app;

import lombok.Getter;
import lombok.SneakyThrows;
import org.junit.BeforeClass;
import org.junit.runner.RunWith;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@Getter
public class SeleniumParent {

    @BeforeClass
    public static void beforeClass() {
        String[] args = {"--spring.profiles.active=test"};
        CertifyAppApplication.main(args);
    }

    private static final WebDriver driver;

    static {
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless", "--disable-gpu", "--window-size=1920,1200","--ignore-certificate-errors","--disable-extensions","--no-sandbox","--disable-dev-shm-usage");
        driver = new ChromeDriver(options);

    }

    public void goToHome() {
        driver.get(TestConstants.HOME_URL);
    }

    private boolean isLoggedIn = false;

    public void login() {
        driver.get(TestConstants.LOGIN_URL);
        driver.findElement(By.cssSelector("#username")).sendKeys(TestConstants.USERNAME);
        driver.findElement(By.cssSelector("#password")).sendKeys(TestConstants.PASSWORD);
        driver.findElement(By.cssSelector("#page-top > div.container.login-box > div > div > form > fieldset > div.row > div:nth-child(1) > input")).click();
        this.isLoggedIn = true;
    }

    public void logout() {
        openLoginMenu();
        driver.findElement(By.cssSelector("#user > div > div > div.modal-footer > a")).click();
        this.isLoggedIn = false;
    }

    @SneakyThrows
    public void openLoginMenu() {
        driver.findElement(By.cssSelector("#user-icon > svg")).click();
        Thread.currentThread().sleep(1000);
    }

    public WebDriver driver() {
        return driver;
    }

}
