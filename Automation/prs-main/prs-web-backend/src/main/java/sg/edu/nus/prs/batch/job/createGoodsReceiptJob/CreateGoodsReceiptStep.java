package sg.edu.nus.prs.batch.job.createGoodsReceiptJob;

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

import sg.edu.nus.prs.domain.purchase.GoodsReceipt;
import sg.edu.nus.prs.service.GoodsReceiptService;

@Component
public class CreateGoodsReceiptStep implements Tasklet {
    private static final Logger logger = LoggerFactory.getLogger(CreateGoodsReceiptStep.class);

    private GoodsReceiptService grService;

    @Autowired
    public CreateGoodsReceiptStep(@Lazy GoodsReceiptService grService) {
        this.grService = grService;
    }

    @Override
    public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {
        
    	JobParameters context = chunkContext.getStepContext().getStepExecution().getJobExecution().getJobParameters();
        
        String poId = context.getString("poId");
        
        logger.info("Creating goods receipt for PO id: {}", poId);
        
        GoodsReceipt goodsReceipt = grService.getToBeCreatedGoodsReceipt(poId);
        
        for (int i = 0; i < 5; i++) {
            if (goodsReceipt != null) { break; }

            try {
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                logger.error("Interrupted while waiting for sleeping while waiting for goods receipt to be available.");
            }

            goodsReceipt = grService.getToBeCreatedGoodsReceipt(poId);
        }
        
        if(null == goodsReceipt) {
        	logger.info("No goods receipt/return to be created.");
        } else {
        	try {
            	grService.createGoodsReceipt(goodsReceipt);
                logger.info("Created Goods Receipt for goods receipt id: {}", goodsReceipt.getId());
            } catch (Exception e) {
                logger.error("Could not create Goods Receipt for goods receipt id: {}", goodsReceipt.getId(), e);
                throw e;
            }     
        }
        
        return RepeatStatus.FINISHED;
    }
}
