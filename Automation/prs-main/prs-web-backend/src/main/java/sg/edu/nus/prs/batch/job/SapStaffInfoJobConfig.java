package sg.edu.nus.prs.batch.job;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobExecutionListener;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.listener.JobExecutionListenerSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SapStaffInfoJobConfig extends JobExecutionListenerSupport {

	private final JobBuilderFactory jobBuilderFactory;
	private final StepBuilderFactory stepBuilderFactory;
	private final SapStaffInfoJobCreationStep createSapStaffInfoJobStep;
	private final SapStaffInfoDataRetrievalStep consumeSapStaffInfoStep;
	private final JobExecutionListener jobExecutionListener;

	public SapStaffInfoJobConfig(JobBuilderFactory jobBuilderFactory,
								 StepBuilderFactory stepBuilderFactory,
								 SapStaffInfoJobCreationStep createSapStaffInfoJobStep,
								 SapStaffInfoDataRetrievalStep consumeSapStaffInfoStep,
								 @Qualifier("prsJobExecutionListener") JobExecutionListener jobExecutionListener) {
		this.jobBuilderFactory = jobBuilderFactory;
		this.stepBuilderFactory = stepBuilderFactory;
		this.createSapStaffInfoJobStep = createSapStaffInfoJobStep;
		this.consumeSapStaffInfoStep = consumeSapStaffInfoStep;
		this.jobExecutionListener = jobExecutionListener;
	}

	@Bean
	protected Step getSapStaffInfoJobCreationStep() {
		return stepBuilderFactory.get("createSapStaffInfoJobStep").tasklet(createSapStaffInfoJobStep).build();
	}

	@Bean
	protected Step getSapStaffInfoDataRetrievalStep() {
		return stepBuilderFactory.get("consumeSapStaffInfoStep").tasklet(consumeSapStaffInfoStep).build();
	}

	@Bean(name = "consumeSapStaffInfoJob")
	public Job job() {
		return jobBuilderFactory.get("consumeSapStaffInfoJob")
				.listener(jobExecutionListener)
				.start(getSapStaffInfoJobCreationStep())
				.next(getSapStaffInfoDataRetrievalStep()).build();
	}

}
