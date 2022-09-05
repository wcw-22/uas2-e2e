package sg.edu.nus.prs.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;

@Configuration
@EnableTransactionManagement
public class DataConfig {
    @Bean("prsJdbcTemplate")
    public JdbcTemplate prsJdbcTemplate(DataSource ds) {
        return new JdbcTemplate(ds);
    }

    @Bean("prsNamedJdbcTemplate")
    public NamedParameterJdbcTemplate prsNamedJdbcTemplate(DataSource ds) {
        return new NamedParameterJdbcTemplate(ds);
    }
}
