package sg.edu.nus.prs.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.web.context.SecurityContextPersistenceFilter;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.security.web.session.HttpSessionEventPublisher;
import sg.edu.nus.prs.config.security.HeaderAuthenticationFilter;
import sg.edu.nus.prs.config.security.SingleSessionAuthenticationFilter;
import sg.edu.nus.prs.util.Constants;

import javax.servlet.Filter;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
    @Bean
    public HttpSessionCsrfTokenRepository httpSessionCsrfTokenRepository() {
        HttpSessionCsrfTokenRepository repo = new HttpSessionCsrfTokenRepository();
        repo.setHeaderName(Constants.XSRF_HEADER);

        return repo;
    }

    @Bean
    public HttpSessionEventPublisher httpSessionEventPublisher() {
        return new HttpSessionEventPublisher();
    }

    @Bean
    public SessionRegistry sessionRegistry() {
        return new SessionRegistryImpl();
    }

    @Configuration
    @Order(1)
    public static class FrontendWebSecurityConfigurationAdapter extends WebSecurityConfigurerAdapter {
        @Autowired
        private HttpSessionCsrfTokenRepository httpSessionCsrfTokenRepository;

        @Autowired
        private SessionRegistry sessionRegistry;

        @Override
        protected void configure(HttpSecurity http) throws Exception {
        	
        	http
        	.headers()
        		.contentSecurityPolicy("script-src 'self'"); 
        	
            http
            .cors()
                .and()
                    .antMatcher("/app/**")
                    .authorizeRequests()
                    .anyRequest().hasAnyRole("API", "USER")
                .and()
                    .formLogin()
                        .loginPage("/login")
                        .defaultSuccessUrl("/app/index.html")
                .and()
                    .logout()
                    .logoutUrl("/spring_security_logout")
                .and()
                    .csrf().csrfTokenRepository(httpSessionCsrfTokenRepository);

            http
                    .addFilterAfter(singleSessionAuthenticationFilter(), SecurityContextPersistenceFilter.class)
                    .sessionManagement()
                    .maximumSessions(1)
                    .sessionRegistry(sessionRegistry)
                    .expiredUrl("/loggedOut");

            http.headers().contentSecurityPolicy(Constants.CONTENT_SECURITY_POLICY);
        }

        @Bean
        Filter singleSessionAuthenticationFilter() {
            return new SingleSessionAuthenticationFilter();
        }
    }

    @Configuration
    @Order(2)
    public static class LogoutSecurityConfigurationAdapter extends WebSecurityConfigurerAdapter {
        @Autowired
        private HttpSessionCsrfTokenRepository httpSessionCsrfTokenRepository;

        @Override
        protected void configure(HttpSecurity http) throws Exception {
        	http
        	.headers()
        		.contentSecurityPolicy("script-src 'self'");
        	
            http
                    .antMatcher("/logout")
                    .authorizeRequests()
                        .anyRequest().hasRole("USER")
                        .and()
                            .formLogin()
                            .loginPage("/login")
                    .and()
                        .logout()
                        .logoutUrl("/spring_security_logout")
                    .and()
                        .csrf().csrfTokenRepository(httpSessionCsrfTokenRepository);

            http.headers().contentSecurityPolicy(Constants.CONTENT_SECURITY_POLICY);
        }
    }

    @Configuration
    @Order(3)
    public static class InboundSecurityConfigurationAdapter extends WebSecurityConfigurerAdapter {
        @Override
        protected void configure(HttpSecurity http) throws Exception {
        	http
        	.headers()
        		.contentSecurityPolicy("script-src 'self'"); 
        	
            http
                .cors().and()
                .antMatcher("/inbound/**")
                    .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                    .addFilterAfter(headerAuthenticationFilter(), SecurityContextPersistenceFilter.class)
                    .authorizeRequests()
                        .anyRequest().hasRole("SERVICE")
                .and()
                    .logout()
                    .logoutUrl("/spring_security_logout")
                .and()
                    .csrf().disable();

            http.headers().contentSecurityPolicy(Constants.CONTENT_SECURITY_POLICY);
        }

        @Bean
        Filter headerAuthenticationFilter() {
            return new HeaderAuthenticationFilter();
        }
    }

    @Configuration
    public static class FormLoginWebSecurityConfigurerAdapter extends WebSecurityConfigurerAdapter {
        @Autowired
        private HttpSessionCsrfTokenRepository httpSessionCsrfTokenRepository;

        @Override
        protected void configure(HttpSecurity http) throws Exception {
        	
        	http
        	.headers()
        		.contentSecurityPolicy("script-src 'self'"); 
        	
            http.cors().and()
                    .authorizeRequests()
                    .antMatchers("/", "/login", "/loggedOut", "/accessDenied", "/process_login", "/resources/**", "/maintenance").permitAll()
                    .anyRequest().authenticated()
                    .and()
                        .csrf().csrfTokenRepository(httpSessionCsrfTokenRepository);

            http.headers().contentSecurityPolicy(Constants.CONTENT_SECURITY_POLICY);
        }
    }
}
