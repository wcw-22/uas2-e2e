package sg.edu.nus.prs.batch.job.inventory;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobExecutionListener;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ReleaseLMMSInventoryJobConfig {
    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;
    private final ReleaseLMMSInventoryStep releaseLMMSInventoryStep;
    private final JobExecutionListener jobExecutionListener;

    @Autowired
    public ReleaseLMMSInventoryJobConfig(JobBuilderFactory jobBuilderFactory,
                                         StepBuilderFactory stepBuilderFactory,
                                         ReleaseLMMSInventoryStep releaseLMMSInventoryStep,
                                         @Qualifier("prsJobExecutionListener") JobExecutionListener jobExecutionListener) {
        this.jobBuilderFactory = jobBuilderFactory;
        this.stepBuilderFactory = stepBuilderFactory;
        this.releaseLMMSInventoryStep = releaseLMMSInventoryStep;
        this.jobExecutionListener = jobExecutionListener;
    }

    @Bean
    protected Step getReleaseLMMSInventoryStep() {
        return stepBuilderFactory.get("releaseLMMSInventoryStep")
                .tasklet(releaseLMMSInventoryStep)
                .build();
    }

    @Bean(name = "releaseLMMSInventoryJob")
    public Job job() {
        return jobBuilderFactory
                .get("releaseLMMSInventoryJob")
                .listener(jobExecutionListener)
                    .start(getReleaseLMMSInventoryStep())
                .build();
    }
}
