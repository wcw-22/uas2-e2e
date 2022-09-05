package sg.edu.nus.prs.config;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@PropertySource("classpath:email.properties")
@Configuration
public class EmailConfig {
    @Value("${email.host}")
    private String host;

    @Value("${config.as.env.sys.property}")
    private String envSysProperty;

    @Value("${config.as.env.sys.loc}")
    private String envSysLOC;

    @Bean
    public JavaMailSender javaMailSender() {
        String env = System.getProperty(envSysProperty);
        boolean isLocal = StringUtils.isNotEmpty(env) || env.equalsIgnoreCase(envSysLOC);

        if (!isLocal) {
            Properties properties = new Properties();
            properties.setProperty("mail.smtp.auth", "false");
            properties.setProperty("mail.smtp.starttls.enable", "true");

            JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();
            javaMailSender.setHost(host);
            javaMailSender.setJavaMailProperties(properties);

            return javaMailSender;
        }
        else {
            // For AS_ENV_SYS=LOC only.
            // Require a local SMTP server.
            // For example, Test Mail Server Tool.
            Properties properties = new Properties();
            properties.setProperty("mail.smtps.socketFactory.port", "25");
            properties.setProperty("mail.smtps.port", "25");
            properties.setProperty("mail.smtps.auth", "false");
            properties.setProperty("mail.smtp.starttls.enable", "true");

            JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();
            javaMailSender.setHost("localhost");
            javaMailSender.setPort(25);
            javaMailSender.setJavaMailProperties(properties);

            return javaMailSender;
        }
    }
}
