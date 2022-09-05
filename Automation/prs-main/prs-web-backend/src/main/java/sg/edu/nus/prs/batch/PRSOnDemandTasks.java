package sg.edu.nus.prs.batch;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import sg.edu.nus.prs.domain.purchase.InventoryRequestType;
import sg.edu.nus.prs.util.Constants;

@Component
public class PRSOnDemandTasks {
	private static final Logger logger = LoggerFactory.getLogger(PRSOnDemandTasks.class);

	private SecureRandom secureRandom = new SecureRandom();

	@Autowired
	PRSJobLauncher jobLauncher;

	@Autowired
	@Qualifier("createPurchaseOrderJob")
	Job createPurchaseOrderJob;

	@Autowired
	@Qualifier("consumeSapStaffInfoJob")
	Job consumeSapStaffInfoJob;

	@Autowired
	@Qualifier("cacheUserDetailsJob")
	Job cacheUserDetailsJob;

	@Autowired
	@Qualifier("failedJobRestarterJob")
	Job failedJobRestarterJob;

	@Autowired
	@Qualifier("releaseLMMSInventoryJob")
	Job releaseLMMSInventoryJob;

	@Autowired
	@Qualifier("createGoodsReceiptJob")
	Job createGoodsReceiptJob;

	@Async
	public void triggerCreatePurchaseOrderJob(String requestId) throws Exception {
		try {
			jobLauncher.launchAsync(createPurchaseOrderJob, new JobParametersBuilder().addString("requestId", requestId)
					.addString(Constants.BATCH_JOB_RETRY_UNTIL_SUCCESS, Constants.YES).toJobParameters());
		} catch (Exception e) {
			logger.error("Error in triggerCreatePurchaseOrderJob. Exception: ", e);
			throw e;
		}
	}

	@Async
	public void triggerRetrieveStaffInfo() {
		try {
			jobLauncher.launchAsync(cacheUserDetailsJob,
					new JobParametersBuilder().addLong("id", secureRandom.nextLong()).toJobParameters());
		} catch (Exception e) {
			logger.error("Error in triggerRetrieveStaffInfo. Exception: ", e);
		}
	}

	@Async
	public void triggerFailedJobRestarterJob() {
		try {
			jobLauncher.launchAsync(failedJobRestarterJob,
					new JobParametersBuilder().addLong("id", secureRandom.nextLong()).toJobParameters());
		} catch (Exception e) {
			logger.error("Error in triggerFailedJobRestarterJob. Exception: ", e);
		}
	}

	@Async
	public void triggerReleaseLMMSInventoryJob(String grId, String poId, String sapPONo,
			InventoryRequestType inventoryRequestType) throws Exception {
		try {
			jobLauncher.launchAsync(releaseLMMSInventoryJob,
					new JobParametersBuilder().addString("grId", grId).addString("poId", poId)
							.addString("sapPONo", sapPONo)
							.addString("inventoryRequestType", inventoryRequestType.name())
							.addString(Constants.BATCH_JOB_RETRY_UNTIL_SUCCESS, Constants.YES).toJobParameters());
		} catch (Exception e) {
			logger.error("Error in triggerCreatePurchaseOrderJob. Exception: ", e);
			throw e;
		}
	}

	@Async
	public void triggerCreateGoodsReceiptJob(String poId) throws Exception {
		try {
			try {
				Thread.sleep(secureRandom.nextInt(5) * 1000);
			} catch (InterruptedException e) {
			}
			jobLauncher.launchAsync(createGoodsReceiptJob,
					new JobParametersBuilder().addString("poId", poId).addLong("systemms", System.nanoTime())
							.addString(Constants.BATCH_JOB_RETRY_UNTIL_SUCCESS, Constants.YES).toJobParameters());
		} catch (Exception e) {
			logger.error("Error in triggerCreateGoodsReceiptJob. Exception: ", e);
			throw e;
		}
	}
}
