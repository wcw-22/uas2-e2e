package sg.edu.nus.prs.batch;

import org.apache.commons.collections4.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobExecutionListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import sg.edu.nus.prs.service.EmailService;
import sg.edu.nus.prs.util.NotificationErrorSource;

import java.util.List;

@Component("prsJobExecutionListener")
public class PRSJobExecutionListener implements JobExecutionListener {
    private static final Logger logger = LoggerFactory.getLogger(PRSJobExecutionListener.class);

    private final EmailService emailService;

    @Autowired
    public PRSJobExecutionListener(EmailService emailService) {
        this.emailService = emailService;
    }

    @Override
    public void beforeJob(JobExecution jobExecution) {
        // Do nothing.
    }

    @Override
    public void afterJob(JobExecution jobExecution) {
        List<Throwable> jobErrors = jobExecution.getAllFailureExceptions();
        if (CollectionUtils.isNotEmpty(jobErrors)) {
            logger.warn("Batch job failure detected.");

            String jobId = jobExecution.getJobId().toString();
        	emailService.prepareEmailToNotifyBatchAndIntegrationException(
        	        NotificationErrorSource.BATCH ,
                    jobId,
                    jobExecution.getJobInstance().getJobName(),
                    jobErrors
            );
        }
    }
}
