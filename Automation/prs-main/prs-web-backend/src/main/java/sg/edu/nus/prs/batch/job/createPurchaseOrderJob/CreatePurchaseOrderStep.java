package sg.edu.nus.prs.batch.job.createPurchaseOrderJob;

import java.util.List;

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

import sg.edu.nus.prs.domain.mapper.PurchaseOrderModelMapper;
import sg.edu.nus.prs.domain.purchase.PurchaseOrder;
import sg.edu.nus.prs.domain.purchase.Request;
import sg.edu.nus.prs.service.PurchaseOrderService;
import sg.edu.nus.prs.service.RequestService;

@Component
public class CreatePurchaseOrderStep implements Tasklet {
    private static final Logger logger = LoggerFactory.getLogger(CreatePurchaseOrderStep.class);

    private PurchaseOrderService purchaseOrderService;
    private RequestService requestService;
    private PurchaseOrderModelMapper mapper;

    @Autowired
    public CreatePurchaseOrderStep(PurchaseOrderService purchaseOrderService,
                                   @Lazy RequestService requestService,
                                   PurchaseOrderModelMapper mapper) {
        this.purchaseOrderService = purchaseOrderService;
        this.requestService = requestService;
        this.mapper = mapper;
    }

    @Override
    public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {
        JobParameters context = chunkContext.getStepContext().getStepExecution().getJobExecution().getJobParameters();

        String requestId = context.getString("requestId");

        logger.info("Creating PO for request id: {}", requestId);

        Request request = requestService.loadRequestById(requestId);
        for (int i = 0; i < 5; i++) {
            if (request != null) { break; }

            try {
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                logger.error("Interrupted while waiting for sleeping while waiting for request to be available.");
            }

            request = requestService.loadRequestById(requestId);
        }

        try {
            List<PurchaseOrder> purchaseOrders = mapper.toDomainObjPurchaseOrders(request);
            
            purchaseOrders = purchaseOrderService.createPurchaseOrders(purchaseOrders, request);
            if (purchaseOrders == null) {
                throw new IllegalStateException("No PO created.");
            }
            
            logger.info("Created PO for request id: {}", requestId);
        } catch (Exception e) {
            logger.error("Could not create PO for request id: {}", requestId, e);
            throw e;
        }

        return RepeatStatus.FINISHED;
    }
}
