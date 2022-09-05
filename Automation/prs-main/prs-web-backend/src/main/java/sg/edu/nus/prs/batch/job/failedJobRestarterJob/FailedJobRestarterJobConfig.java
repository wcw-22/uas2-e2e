package sg.edu.nus.prs.batch.job.failedJobRestarterJob;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobExecutionListener;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FailedJobRestarterJobConfig {
    @Bean
    protected Step getFailedJobRestarterStep(StepBuilderFactory stepBuilderFactory, FailedJobRestarterStep failedJobRestarterStep) {
        return stepBuilderFactory.get("failedJobRestarterStep").tasklet(failedJobRestarterStep).build();
    }

    @Bean(name = "failedJobRestarterJob")
    public Job job(JobBuilderFactory jobBuilderFactory,
                   StepBuilderFactory stepBuilderFactory,
                   FailedJobRestarterStep failedJobRestarterStep,
                   @Qualifier("prsJobExecutionListener") JobExecutionListener jobExecutionListener) {
        return jobBuilderFactory
                .get("failedJobRestarterJob")
                .listener(jobExecutionListener)
                .start(getFailedJobRestarterStep(stepBuilderFactory, failedJobRestarterStep))
                .build();
    }
}
