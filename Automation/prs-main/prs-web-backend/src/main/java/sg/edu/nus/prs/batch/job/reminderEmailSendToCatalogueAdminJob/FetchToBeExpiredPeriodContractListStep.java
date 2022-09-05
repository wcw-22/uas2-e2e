package sg.edu.nus.prs.batch.job.reminderEmailSendToCatalogueAdminJob;

import java.util.ArrayList;
import java.util.List;

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

import sg.edu.nus.prs.domain.periodcontract.PeriodContract;
import sg.edu.nus.prs.domain.purchase.Request;
import sg.edu.nus.prs.service.PeriodContractService;
import sg.edu.nus.prs.service.RequestService;

@Component
public class FetchToBeExpiredPeriodContractListStep implements Tasklet, StepExecutionListener {
	private static final Logger logger = LoggerFactory.getLogger(FetchToBeExpiredPeriodContractListStep.class);

	private PeriodContractService periodContractService;
	private List<PeriodContract> periodContractList = null;

	@Autowired
	public FetchToBeExpiredPeriodContractListStep(PeriodContractService periodContractService) {
		this.periodContractService = periodContractService;
	}

	@Override
	public void beforeStep(StepExecution stepExecution) {
		periodContractList = new ArrayList<PeriodContract>();
		logger.debug("FetchPendingPRListStep - before step....");
	}

	@Override
	public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) {
		logger.debug("FetchToBeExpiredPeriodContractListStep - execute");
		String todaysDateStr = (String) chunkContext.getStepContext().getJobParameters().get("todaysDateStr");
		long periodContractFirstReminderday = (long) chunkContext.getStepContext().getJobParameters().get("periodContractFirstReminderday");
		long periodContractSecondReminderday = (long) chunkContext.getStepContext().getJobParameters().get("periodContractSecondReminderday");
		long periodContractThirdReminderday = (long) chunkContext.getStepContext().getJobParameters().get("periodContractThirdReminderday");
		long periodContractFourthReminderday = (long) chunkContext.getStepContext().getJobParameters().get("periodContractFourthReminderday");
		double firstTriggerLimit = (double) chunkContext.getStepContext().getJobParameters().get("firstTriggerLimit");
		double secondTriggerLimit = (double) chunkContext.getStepContext().getJobParameters().get("secondTriggerLimit");
		
		ArrayList<Long> reminderDays = new ArrayList<Long>();
		reminderDays.add(periodContractFirstReminderday);
		reminderDays.add(periodContractSecondReminderday);
		reminderDays.add(periodContractThirdReminderday);
		reminderDays.add(periodContractFourthReminderday);
		
		periodContractList = periodContractService.fetchToBeExpiredPeriodContractList(todaysDateStr, reminderDays, firstTriggerLimit, secondTriggerLimit);
		return RepeatStatus.FINISHED;
	}
	
	@Override
	public ExitStatus afterStep(StepExecution stepExecution) {
		logger.debug("FetchToBeExpiredPeriodContractListStep - after step....");
		stepExecution.getJobExecution().getExecutionContext().put("periodContractList", periodContractList);

		return ExitStatus.COMPLETED;
	}

}
