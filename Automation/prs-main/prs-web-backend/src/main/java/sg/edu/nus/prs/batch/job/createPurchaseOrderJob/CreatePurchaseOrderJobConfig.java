package sg.edu.nus.prs.batch.job.createPurchaseOrderJob;

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
public class CreatePurchaseOrderJobConfig {
    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;
    private final CreatePurchaseOrderStep createPurchaseOrderStep;
    private final JobExecutionListener jobExecutionListener;

    @Autowired
    public CreatePurchaseOrderJobConfig(JobBuilderFactory jobBuilderFactory,
                                        StepBuilderFactory stepBuilderFactory,
                                        CreatePurchaseOrderStep createPurchaseOrderStep,
                                        @Qualifier("prsJobExecutionListener") JobExecutionListener jobExecutionListener) {
        this.jobBuilderFactory = jobBuilderFactory;
        this.stepBuilderFactory = stepBuilderFactory;
        this.createPurchaseOrderStep = createPurchaseOrderStep;
        this.jobExecutionListener = jobExecutionListener;
    }

    @Bean
    protected Step getCreatePurchaseOrderStep() {
        return stepBuilderFactory.get("createPurchaseOrderStep")
                .tasklet(createPurchaseOrderStep)
                .build();
    }

    @Bean(name = "createPurchaseOrderJob")
    public Job job() {
        return jobBuilderFactory
                .get("createPurchaseOrderJob")
                .listener(jobExecutionListener)
                    .start(getCreatePurchaseOrderStep())
                .build();
    }
}
