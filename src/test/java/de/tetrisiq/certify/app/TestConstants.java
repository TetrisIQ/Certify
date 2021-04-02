package de.tetrisiq.certify.app;

import javax.transaction.NotSupportedException;

public class TestConstants {

    public static final String USERNAME = "admin";
    public static final String PASSWORD = "admin";

    public static String HOME_URL = "http://localhost:8080/";
    public static String LOGIN_URL = "http://localhost:8080/login";
    public static String NEW_URL = "http://localhost:8080/new";
    public static String VERIFY_URL = "http://localhost:8080/verify";

    TestConstants() throws NotSupportedException {
        throw new NotSupportedException();
    }
}
