package sg.edu.nus.prs.config;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class AppConfigPropertiesImpl implements AppConfigProperties {
    @Value("${adfs.appId}")
    private String ADFSAppId;

    @Override
    public String getADFSAppId() {
        return this.ADFSAppId;
    }

    @Override
    public boolean isProductionEnvironment() {
        String env = System.getProperty("AS_ENV_SYS");
        return env != null && env.equalsIgnoreCase("PRD");
    }

    @Override
    public boolean allowMockedLogins() {
        String env = System.getProperty("AS_ENV_SYS");
        if (StringUtils.isNotEmpty(env)) {
            // Allow mocked logins in these environments only..
            return StringUtils.equals("SIT", env)
                    || StringUtils.equals("LOC", env)
                    || StringUtils.equals("QAT", env);
        }

        return false;
    }

    @Override
    public String getEnvironment() {
        return System.getProperty("AS_ENV_SYS");
    }
}
