package sg.edu.nus.prs.config;

public interface AppConfigProperties {
    String getADFSAppId();

    boolean isProductionEnvironment();

    boolean allowMockedLogins();

    String getEnvironment();
}
