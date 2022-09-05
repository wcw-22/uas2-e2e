package sg.edu.nus.prs.batch.job.reminderEmailSendToCatalogueAdminJob;

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
import sg.edu.nus.prs.domain.periodcontract.PeriodContract;
import sg.edu.nus.prs.domain.purchase.Request;
import sg.edu.nus.prs.service.EmailService;

@Component
public class SendReminderEmailToCatalogueAdminStep implements Tasklet, StepExecutionListener {
	private static final Logger logger = LoggerFactory.getLogger(SendReminderEmailToCatalogueAdminStep.class);

	private EmailService emailService;
	private List<PeriodContract> periodContractList = null;

	@Autowired
	public SendReminderEmailToCatalogueAdminStep(EmailService emailService) {
		this.emailService = emailService;
	}

	@SuppressWarnings("unchecked")
	@Override
	public void beforeStep(StepExecution stepExecution) {
		this.periodContractList = (List<PeriodContract>) stepExecution.getJobExecution().getExecutionContext().get("periodContractList");
		logger.debug("SendReminderEmailToCatalogueAdminStep - before step....");
	}

	@Override
	public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) {
		logger.debug("SendReminderEmailToCatalogueAdminStep - execute");
		if (CollectionUtils.isNotEmpty(periodContractList)) {
			periodContractList.forEach(periodContract -> {
				Email email = emailService.prepareNotifyReminderEmailToApproverCatalogueAdmin(periodContract);
				if (null != email && CollectionUtils.isNotEmpty(email.getRecipient())) {
					emailService.sendEmail(email);
				}
			});
		}
		
		return RepeatStatus.FINISHED;
	}
	
	@Override
	public ExitStatus afterStep(StepExecution stepExecution) {
		logger.debug("SendReminderEmailToCatalogueAdminStep - after step....");
		return ExitStatus.COMPLETED;
	}

}
