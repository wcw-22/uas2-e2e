package sg.edu.nus.prs.batch.job.inventory;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import sg.edu.nus.prs.domain.purchase.InventoryRequestType;
import sg.edu.nus.prs.service.GoodsReceiptService;

@Component
public class ReleaseLMMSInventoryStep implements Tasklet {
    private static final Logger logger = LoggerFactory.getLogger(ReleaseLMMSInventoryStep.class);

    private GoodsReceiptService grService;

    @Autowired
    public ReleaseLMMSInventoryStep(@Lazy GoodsReceiptService grService) {
        this.grService = grService;
    }

	@Override
    public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {
        JobParameters context = chunkContext.getStepContext().getStepExecution().getJobExecution().getJobParameters();

        String grId = context.getString("grId");
        String poId = context.getString("poId");
        String sapPONo = context.getString("sapPONo");
        String inventoryRequestType = context.getString("inventoryRequestType");
        
		if (StringUtils.isNotEmpty(grId) && StringUtils.isNotEmpty(poId) && StringUtils.isNotEmpty(sapPONo)
				&& StringUtils.isNotEmpty(inventoryRequestType)) {
			logger.info("Release LMMS inventory for goods receipt/return id: {}", grId);
			try {
				grService.releaseLMMSInventory(grId, poId, InventoryRequestType.valueOf(inventoryRequestType));
				logger.info("Released LMMS inventory for goods receipt/return: {}", grId);
			} catch (Exception e) {
				logger.error("Could not release LMMS inventory for goods receipt/return id: {}", grId, e);
				throw e;
			}
		}

        return RepeatStatus.FINISHED;
    }
}
