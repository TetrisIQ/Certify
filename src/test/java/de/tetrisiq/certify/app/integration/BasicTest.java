package de.tetrisiq.certify.app.integration;

import de.tetrisiq.certify.app.SeleniumParent;
import de.tetrisiq.certify.app.TestConstants;
import org.junit.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class BasicTest extends SeleniumParent {

    @Test
    public void login() {
        super.login();
        driver().navigate().to(TestConstants.NEW_URL);
        assertEquals(TestConstants.NEW_URL, driver().getCurrentUrl());
    }

    @Test
    public void navigateToHome() {
        super.goToHome();
        assertEquals(TestConstants.HOME_URL, driver().getCurrentUrl());
    }

    @Test
    public void logout() {
        if (!isLoggedIn()) login();
        super.logout();
        driver().navigate().to(TestConstants.NEW_URL);
        assertEquals(TestConstants.LOGIN_URL, driver().getCurrentUrl());
    }
}
