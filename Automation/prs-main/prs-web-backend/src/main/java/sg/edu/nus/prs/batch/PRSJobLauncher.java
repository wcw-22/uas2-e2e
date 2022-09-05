package sg.edu.nus.prs.batch;

import java.security.SecureRandom;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersInvalidException;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.repository.JobExecutionAlreadyRunningException;
import org.springframework.batch.core.repository.JobInstanceAlreadyCompleteException;
import org.springframework.batch.core.repository.JobRestartException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Component;

@Component
public class PRSJobLauncher {
	
	private SecureRandom secureRandom = new SecureRandom();
	
	@Autowired
    @Qualifier("asyncJobLauncher")
    JobLauncher asyncJobLauncher;
	
	@Autowired
	@Qualifier("syncJobLauncher")
	JobLauncher syncJobLauncher;
	
	@Retryable(exceptionExpression = "#{message.contains('ORA-08177')}", maxAttempts = 6, backoff = @Backoff(delay = 60000) )
	public void launch(Job job, JobParameters jobParameters) throws JobExecutionAlreadyRunningException, JobRestartException, JobInstanceAlreadyCompleteException, JobParametersInvalidException {
		try {
			Thread.sleep(secureRandom.nextInt(10) * 1000 );
		} catch (InterruptedException e) {
		}
		syncJobLauncher.run(job, jobParameters);
	}
	
	@Retryable(exceptionExpression = "#{message.contains('ORA-08177')}", maxAttempts = 6, backoff = @Backoff(delay = 60000))
	public void launchAsync(Job job, JobParameters jobParameters) throws JobExecutionAlreadyRunningException, JobRestartException, JobInstanceAlreadyCompleteException, JobParametersInvalidException {
		asyncJobLauncher.run(job, jobParameters);
	}
	
	

}
