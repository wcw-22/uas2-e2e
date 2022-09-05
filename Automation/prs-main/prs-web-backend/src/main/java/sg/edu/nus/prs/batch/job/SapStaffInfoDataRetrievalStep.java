package sg.edu.nus.prs.batch.job;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.ExitStatus;
import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.StepExecution;
import org.springframework.batch.core.StepExecutionListener;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.item.ExecutionContext;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import sg.edu.nus.prs.domain.user.StaffDetail;
import sg.edu.nus.prs.service.StaffSAPService;
import sg.edu.nus.prs.util.Constants;

import java.util.List;
import java.util.Locale;

@Component
public class SapStaffInfoDataRetrievalStep implements Tasklet, StepExecutionListener {
	private long SLEEP_TIME = 30000;

	private static final Logger logger = LoggerFactory.getLogger(SapStaffInfoDataRetrievalStep.class);

	private StaffSAPService staffSAPService;

	@Autowired
	public SapStaffInfoDataRetrievalStep(StaffSAPService staffSAPService) {
		this.staffSAPService = staffSAPService;
	}

	@Override
	public void beforeStep(StepExecution stepExecution) {
	}

	@Override
	public ExitStatus afterStep(StepExecution stepExecution) {
		logger.debug("SapStaffStudentInfoDataRetrievalStep - after step...");

		ExecutionContext context = stepExecution.getJobExecution().getExecutionContext();

		if (context != null) {
			staffSAPService.deleteJob(context.getString("jobNo"));
		}

		return ExitStatus.COMPLETED;
	}

	@Override
	public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {
		
		logger.info("SapStaffStudentInfoDataRetrievalStep - execute");

		ExecutionContext context = chunkContext.getStepContext().getStepExecution().getJobExecution().getExecutionContext();

		if (context != null) {
			String jobNo = context.getString("jobNo");
			String jobStatus;
			if (!StringUtils.isEmpty(jobNo)) {
				do {
					jobStatus = staffSAPService.checkStatus(jobNo);
					logger.info("SapStaffStudentInfoDataRetrievalStep - execute. Job No: " + jobNo + ". Job Status: " + jobStatus);

					if (StringUtils.isNotEmpty(jobStatus)) {
						jobStatus = jobStatus.toUpperCase(Locale.getDefault());
					}

					if (Constants.STAFF_BATCH_PROCESSED.equals(jobStatus)) {
						List<StaffDetail> staffList = staffSAPService.retrieveData(jobNo);

						staffList.forEach(staff -> staffSAPService.cacheStaff(staff));
						logger.info("SapStaffStudentInfoDataRetrievalStep - execute. No of staff records: " + staffList.size());

						break;
					}

					try {
						Thread.sleep(SLEEP_TIME);
					} catch (InterruptedException e) {
						logger.error("Interrupted while waiting for staff check status to return 'Processed'. Returning error.");
						throw e;
					}
				} while (true);
			}

			staffSAPService.setStaffCacheLoaded();
		}
		
		return RepeatStatus.FINISHED;
	}

	public void setSleepTime(long sleepTimeMS) {
		this.SLEEP_TIME = sleepTimeMS;
	}
}
