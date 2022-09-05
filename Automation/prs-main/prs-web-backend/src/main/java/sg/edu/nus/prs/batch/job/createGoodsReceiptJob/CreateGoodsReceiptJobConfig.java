package sg.edu.nus.prs.batch.job.createGoodsReceiptJob;

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
public class CreateGoodsReceiptJobConfig {
    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;
    private final CreateGoodsReceiptStep createGoodsReceiptStep;
    private final JobExecutionListener jobExecutionListener;

    @Autowired
    public CreateGoodsReceiptJobConfig(JobBuilderFactory jobBuilderFactory,
                                        StepBuilderFactory stepBuilderFactory,
                                        CreateGoodsReceiptStep createGoodsReceiptStep,
                                        @Qualifier("prsJobExecutionListener") JobExecutionListener jobExecutionListener) {
        this.jobBuilderFactory = jobBuilderFactory;
        this.stepBuilderFactory = stepBuilderFactory;
        this.createGoodsReceiptStep = createGoodsReceiptStep;
        this.jobExecutionListener = jobExecutionListener;
    }

    @Bean
    protected Step getCreateGoodsReceiptStep() {
        return stepBuilderFactory.get("createGoodsReceiptStep")
                .tasklet(createGoodsReceiptStep)
                .build();
    }

    @Bean(name = "createGoodsReceiptJob")
    public Job job() {
        return jobBuilderFactory
                .get("createGoodsReceiptJob")
                .listener(jobExecutionListener)
                    .start(getCreateGoodsReceiptStep())
                .build();
    }
}
