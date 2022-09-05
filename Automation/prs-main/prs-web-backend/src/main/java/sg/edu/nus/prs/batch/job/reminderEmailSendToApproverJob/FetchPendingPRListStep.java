package sg.edu.nus.prs.batch.job.reminderEmailSendToApproverJob;

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

import sg.edu.nus.prs.domain.purchase.Request;
import sg.edu.nus.prs.service.RequestService;

@Component
public class FetchPendingPRListStep implements Tasklet, StepExecutionListener {
	private static final Logger logger = LoggerFactory.getLogger(FetchPendingPRListStep.class);

	private RequestService requestService;
	private List<Request> pendingPRList = null;

	@Autowired
	public FetchPendingPRListStep(RequestService requestService) {
		this.requestService = requestService;
	}

	@Override
	public void beforeStep(StepExecution stepExecution) {
		pendingPRList = new ArrayList<Request>();
		logger.debug("FetchPendingPRListStep - before step....");
	}

	@Override
	public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) {
		logger.debug("FetchPendingPRListStep - execute");
		String todaysDateStr = (String) chunkContext.getStepContext().getJobParameters().get("todaysDateStr");
		long reminderemailWaitingdays = (long) chunkContext.getStepContext().getJobParameters().get("reminderemailWaitingdays");
		pendingPRList = requestService.fetchPendingPRList(todaysDateStr,reminderemailWaitingdays);
		return RepeatStatus.FINISHED;
	}
	
	@Override
	public ExitStatus afterStep(StepExecution stepExecution) {
		logger.debug("FetchPendingPRListStep - after step....");
		stepExecution.getJobExecution().getExecutionContext().put("pendingPRList", pendingPRList);

		return ExitStatus.COMPLETED;
	}

}
