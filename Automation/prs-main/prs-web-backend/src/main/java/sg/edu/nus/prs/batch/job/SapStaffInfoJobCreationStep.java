package sg.edu.nus.prs.batch.job;

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
import sg.edu.nus.prs.service.StaffSAPService;

@Component
public class SapStaffInfoJobCreationStep implements Tasklet, StepExecutionListener {
	private static final Logger logger = LoggerFactory.getLogger(SapStaffInfoJobCreationStep.class);

	private StaffSAPService staffSAPService;

	@Autowired
	public SapStaffInfoJobCreationStep(StaffSAPService staffSAPService) {
		this.staffSAPService = staffSAPService;
	}

	@Override
	public void beforeStep(StepExecution stepExecution) {
		logger.debug("SapStaffInfoJobCreationStep - before step....");
	}

	@Override
	public ExitStatus afterStep(StepExecution stepExecution) {
		logger.debug("SapStaffInfoJobCreationStep - after step....");

		return ExitStatus.COMPLETED;
	}

	@Override
	public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) {
		logger.debug("SapStaffInfoJobCreationStep - execute");

		String jobNo = staffSAPService.createJob();
		chunkContext.getStepContext().getStepExecution().getJobExecution().getExecutionContext().putString("jobNo", jobNo);

		return RepeatStatus.FINISHED;
	}

}
