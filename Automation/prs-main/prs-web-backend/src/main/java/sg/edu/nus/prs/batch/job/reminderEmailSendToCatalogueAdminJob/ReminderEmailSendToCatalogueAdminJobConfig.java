package sg.edu.nus.prs.batch.job.reminderEmailSendToCatalogueAdminJob;

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
public class ReminderEmailSendToCatalogueAdminJobConfig extends JobExecutionListenerSupport {
	private final JobBuilderFactory jobBuilderFactory;
	private final StepBuilderFactory stepBuilderFactory;
	private final FetchToBeExpiredPeriodContractListStep fetchToBeExpiredPeriodContractListStep;
	private final SendReminderEmailToCatalogueAdminStep sendReminderEmailToCatalogueAdminStep;
	private final JobExecutionListener jobExecutionListener;

	@Autowired
	public ReminderEmailSendToCatalogueAdminJobConfig(JobBuilderFactory jobBuilderFactory,
												StepBuilderFactory stepBuilderFactory,
												FetchToBeExpiredPeriodContractListStep fetchToBeExpiredPeriodContractListStep,
												SendReminderEmailToCatalogueAdminStep sendReminderEmailToCatalogueAdminStep,
												@Qualifier("prsJobExecutionListener") JobExecutionListener jobExecutionListener) {
		this.jobBuilderFactory = jobBuilderFactory;
		this.stepBuilderFactory = stepBuilderFactory;
		this.fetchToBeExpiredPeriodContractListStep = fetchToBeExpiredPeriodContractListStep;
		this.sendReminderEmailToCatalogueAdminStep = sendReminderEmailToCatalogueAdminStep;
		this.jobExecutionListener = jobExecutionListener;
	}

	@Bean
	public Step getToBeExpiredPeriodContractListStep() {
		return stepBuilderFactory.get("fetchToBeExpiredPeriodContractListStep").tasklet(fetchToBeExpiredPeriodContractListStep).build();
	}
	
	@Bean
	public Step pushReminderEmailToCatalogueAdminStep() {
		return stepBuilderFactory.get("sendReminderEmailToCatalogueAdminStep").tasklet(sendReminderEmailToCatalogueAdminStep).build();
	}

	@Bean(name = "reminderEmailSendToCatalogueAdminJob")
	public Job job() {
		return jobBuilderFactory.get("reminderEmailSendToCatalogueAdminJob")
				.listener(jobExecutionListener)
				.start(getToBeExpiredPeriodContractListStep())
				.next(pushReminderEmailToCatalogueAdminStep())
				.build();
	}

}
