package sg.edu.nus.prs.batch.job.reminderEmailSendToApproverJob;

import java.util.List;

import org.apache.commons.collections4.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.ExitStatus;
import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.StepExecution;
import org.springframework.batch.core.StepExecutionListener;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import sg.edu.nus.prs.domain.common.Email;
import sg.edu.nus.prs.domain.purchase.Request;
import sg.edu.nus.prs.service.EmailService;

@Component
public class SendReminderEmailToApproverStep implements Tasklet, StepExecutionListener {
	private static final Logger logger = LoggerFactory.getLogger(SendReminderEmailToApproverStep.class);

	private EmailService emailService;
	private List<Request> pendingPRList = null;

	@Autowired
	public SendReminderEmailToApproverStep(EmailService emailService) {
		this.emailService = emailService;
	}

	@SuppressWarnings("unchecked")
	@Override
	public void beforeStep(StepExecution stepExecution) {
		this.pendingPRList = (List<Request>) stepExecution.getJobExecution().getExecutionContext().get("pendingPRList");
		logger.debug("SendReminderEmailToApproverStep - before step....");
	}

	@Override
	public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) {
		logger.debug("SendReminderEmailToApproverStep - execute");
		if (CollectionUtils.isNotEmpty(pendingPRList)) {
			pendingPRList.forEach(request -> {
				Email email = emailService.prepareNotifyReminderEmailToApprover(request);
				if (null != email && CollectionUtils.isNotEmpty(email.getRecipient())) {
					emailService.sendEmail(email);
				}
			});
		}
		
		return RepeatStatus.FINISHED;
	}
	
	@Override
	public ExitStatus afterStep(StepExecution stepExecution) {
		logger.debug("SendReminderEmailToApproverStep - after step....");
		return ExitStatus.COMPLETED;
	}

}
