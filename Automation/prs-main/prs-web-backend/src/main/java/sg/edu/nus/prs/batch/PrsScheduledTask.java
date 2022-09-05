package sg.edu.nus.prs.batch;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.event.ContextClosedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import sg.edu.nus.prs.util.Constants;

@Component
public class PrsScheduledTask {
	private static final Logger logger = LoggerFactory.getLogger(PrsScheduledTask.class);

	private SecureRandom secureRandom = new SecureRandom();

	@Autowired
	PRSJobLauncher jobLauncher;

	@Autowired
	@Qualifier("cacheUserDetailsJob")
	Job cacheUserDetailsJob;
	
	@Autowired
	@Qualifier("reminderEmailSendToApproverJob")
	Job reminderEmailSendToApproverJob;

	@Autowired
	@Qualifier("reminderEmailSendToCatalogueAdminJob")
	Job reminderEmailSendToCatalogueAdminJob;

	@Autowired
	@Qualifier("failedJobRestarterJob")
	Job failedJobRestarterJob;
	
	@Value("${email.periodcontract.firstreminderday}")
    private long periodContractFirstReminderday;
	
	@Value("${email.periodcontract.secondreminderday}")
    private long periodContractSecondReminderday;
	
	@Value("${email.periodcontract.thirdreminderday}")
    private long periodContractThirdReminderday;
	
	@Value("${email.periodcontract.fourthreminderday}")
    private long periodContractFourthReminderday;
	
	@Value("${email.periodcontract.firstTriggerLimit}")
    private double firstTriggerLimit;
    
	@Value("${email.periodcontract.secondTriggerLimit}")
    private double secondTriggerLimit;
	
	@Value("${email.reminderemail.waitingdays}")
    private long reminderemailWaitingdays;

	//Every 1:30 AM every day
	@Scheduled(cron = "0 30 1 * * ?")
	public void cacheUserDetailsJob() {
		try {
			jobLauncher.launch(cacheUserDetailsJob,
					new JobParametersBuilder().addLong("id", secureRandom.nextLong()).toJobParameters());
		} catch (Exception e) {
			logger.error("Error in cacheUserDetailsJob. Exception: ", e);
		}
	}
	
	//Everyday at 8:00 AM
	@Scheduled(cron = "0 0 8 * * ?")
	public void reminderEmailSendToApproverScheduler() {
		LocalDateTime localDateTime = LocalDateTime.now();
		localDateTime = localDateTime.with(LocalTime.MIDNIGHT);
		String todaysDateStr = localDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
		try {
			JobParametersBuilder jobBuilder= new JobParametersBuilder();
			jobBuilder
					.addString("todaysDateStr", todaysDateStr)
					.addLong("reminderemailWaitingdays", reminderemailWaitingdays)
					.addString(Constants.BATCH_JOB_RETRY_UNTIL_SUCCESS, Constants.YES);

			jobLauncher.launch(reminderEmailSendToApproverJob, jobBuilder.toJobParameters());
		} catch (Exception e) {
			logger.error("Error in reminderEmailSendToApproverScheduler. Exception: ", e);
		} finally {
			localDateTime = null;
			todaysDateStr = null;
		}
	}
	
	//Everyday at 7:30 AM
		@Scheduled(cron = "0 30 07 * * ?")
		public void reminderEmailSendToCatalogueAdminScheduler() {
			LocalDateTime localDateTime = LocalDateTime.now();
			localDateTime = localDateTime.with(LocalTime.MIDNIGHT);
			String todaysDateStr = localDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
			try {
				JobParametersBuilder jobBuilder= new JobParametersBuilder();
				jobBuilder
						.addString("todaysDateStr", todaysDateStr)
						//.addLong("reminderemailWaitingdays", reminderemailWaitingdays)
						.addLong("periodContractFirstReminderday", periodContractFirstReminderday)
						.addLong("periodContractSecondReminderday", periodContractSecondReminderday)
						.addLong("periodContractThirdReminderday", periodContractThirdReminderday)
						.addLong("periodContractFourthReminderday", periodContractFourthReminderday)
						.addDouble("firstTriggerLimit", firstTriggerLimit)
						.addDouble("secondTriggerLimit", secondTriggerLimit)
						.addString(Constants.BATCH_JOB_RETRY_UNTIL_SUCCESS, Constants.YES);

				jobLauncher.launch(reminderEmailSendToCatalogueAdminJob, jobBuilder.toJobParameters());
			} catch (Exception e) {
				logger.error("Error in reminderEmailSendToCatalogueAdminScheduler. Exception: ", e);
			} finally {
				localDateTime = null;
				todaysDateStr = null;
			}
		}


	//Everyday at 12:05 AM and 12:05 pm
	@Scheduled(cron = "0 5 0/12 * * ?")
	public void scheduledFailedJobRestarterJob() {
		LocalDateTime localDateTime = LocalDateTime.now();
		localDateTime = localDateTime.truncatedTo(ChronoUnit.HOURS);
		String dateStr = localDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

		try {
			jobLauncher.launch(failedJobRestarterJob,
					new JobParametersBuilder().addString("jobTime", dateStr)
							.toJobParameters());
		} catch (Exception e) {
			logger.error("Error in scheduledFailedJobRestarterJob. Exception: ", e);
		}
	}


	@SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
	@Autowired
	private javax.cache.CacheManager cacheManager;

	@EventListener(ContextClosedEvent.class)
	public void close() {
	    cacheManager.close();
	}
}
