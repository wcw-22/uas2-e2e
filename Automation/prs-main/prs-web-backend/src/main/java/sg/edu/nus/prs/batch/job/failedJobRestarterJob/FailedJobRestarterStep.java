package sg.edu.nus.prs.batch.job.failedJobRestarterJob;

import org.apache.commons.collections4.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.*;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import sg.edu.nus.prs.service.BatchJobService;

import java.util.Date;
import java.util.List;

@Component
public class FailedJobRestarterStep implements Tasklet, StepExecutionListener {
    private static final Logger logger = LoggerFactory.getLogger(FailedJobRestarterStep.class);

    private BatchJobService batchJobService;

    @Autowired
    public FailedJobRestarterStep(BatchJobService batchJobService) {
        this.batchJobService = batchJobService;
    }

    @Override
    public void beforeStep(StepExecution stepExecution) {
    }

    @Override
    public ExitStatus afterStep(StepExecution stepExecution) {
        return null;
    }

    @Override
    public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) {
        // Find all jobs to restart.
        List<Long> toRestart = batchJobService.getBatchJobsToRestart();

        // Restart the jobs.
        if (CollectionUtils.isNotEmpty(toRestart)) {
            for (Long jobExecutionId: toRestart) {
                this.batchJobService.restartJob(jobExecutionId);
            }
        }

        return RepeatStatus.FINISHED;
    }
}
