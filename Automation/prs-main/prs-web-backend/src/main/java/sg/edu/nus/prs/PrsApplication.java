package sg.edu.nus.prs;

import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.reactive.ReactiveSecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.security.reactive.ReactiveUserDetailsServiceAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.ImportResource;
import org.springframework.context.annotation.PropertySource;
import org.springframework.integration.config.EnableIntegration;
import org.springframework.retry.annotation.EnableRetry;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication(exclude = {
		ErrorMvcAutoConfiguration.class,
		ReactiveUserDetailsServiceAutoConfiguration.class,
		UserDetailsServiceAutoConfiguration.class,
		ReactiveSecurityAutoConfiguration.class
})
@EnableCaching
@EnableIntegration
@EnableBatchProcessing
@PropertySource("classpath:ws-endpoints-${AS_ENV_SYS}.properties")
@ImportResource("classpath:META-INF/spring/integration/http-outbound-config.xml")
@EnableScheduling
@EnableAsync
@EnableRetry
public class PrsApplication extends SpringBootServletInitializer {
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(PrsApplication.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(PrsApplication.class, args);
	}
}
