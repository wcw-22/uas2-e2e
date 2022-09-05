package sg.edu.nus.prs.batch.job.reminderEmailSendToApproverJob;

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
public class ReminderEmailSendToApproverJobConfig extends JobExecutionListenerSupport {
	private final JobBuilderFactory jobBuilderFactory;
	private final StepBuilderFactory stepBuilderFactory;
	private final FetchPendingPRListStep fetchPendingPRListStep;
	private final SendReminderEmailToApproverStep sendReminderEmailToApproverStep;
	private final JobExecutionListener jobExecutionListener;

	@Autowired
	public ReminderEmailSendToApproverJobConfig(JobBuilderFactory jobBuilderFactory,
												StepBuilderFactory stepBuilderFactory,
												FetchPendingPRListStep fetchPendingPRListStep,
												SendReminderEmailToApproverStep sendReminderEmailToApproverStep,
												@Qualifier("prsJobExecutionListener") JobExecutionListener jobExecutionListener) {
		this.jobBuilderFactory = jobBuilderFactory;
		this.stepBuilderFactory = stepBuilderFactory;
		this.fetchPendingPRListStep = fetchPendingPRListStep;
		this.sendReminderEmailToApproverStep = sendReminderEmailToApproverStep;
		this.jobExecutionListener = jobExecutionListener;
	}

	@Bean
	protected Step getPendingPRListStep() {
		return stepBuilderFactory.get("fetchPendingPRListStep").tasklet(fetchPendingPRListStep).build();
	}
	
	@Bean
	protected Step pushReminderEmailToApproverStep() {
		return stepBuilderFactory.get("sendReminderEmailToApproverStep").tasklet(sendReminderEmailToApproverStep).build();
	}

	@Bean(name = "reminderEmailSendToApproverJob")
	public Job job() {
		return jobBuilderFactory.get("reminderEmailSendToApproverJob")
				.listener(jobExecutionListener)
				.start(getPendingPRListStep())
				.next(pushReminderEmailToApproverStep())
				.build();
	}

}
