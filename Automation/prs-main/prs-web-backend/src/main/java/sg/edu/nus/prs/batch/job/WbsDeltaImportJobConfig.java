package sg.edu.nus.prs.batch.job;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobExecutionListener;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.item.*;
import org.springframework.batch.item.support.PassThroughItemProcessor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import sg.edu.nus.prs.domain.inbound.InboundRequest;
import sg.edu.nus.prs.domain.inbound.InboundRequestType;
import sg.edu.nus.prs.service.InboundStagingService;

import java.util.List;

@Configuration
public class WbsDeltaImportJobConfig {

	private final JobBuilderFactory jobBuilderFactory;
	private final StepBuilderFactory stepBuilderFactory;
	private final InboundStagingService inboundStagingService;
	private final JobExecutionListener jobExecutionListener;

	public WbsDeltaImportJobConfig(JobBuilderFactory jobBuilderFactory,
								   StepBuilderFactory stepBuilderFactory,
								   InboundStagingService inboundStagingService,
								   @Qualifier("prsJobExecutionListener") JobExecutionListener jobExecutionListener) {
		this.jobBuilderFactory = jobBuilderFactory;
		this.stepBuilderFactory = stepBuilderFactory;
		this.inboundStagingService = inboundStagingService;
		this.jobExecutionListener = jobExecutionListener;
	}

	@SuppressWarnings("unchecked")
	@Bean(name = "wbsDeltaImportJob")
	public Job wbsDeltaImportJob() {
		return jobBuilderFactory.get("wbsDeltaImportJob").incrementer(new RunIdIncrementer())
				.listener(jobExecutionListener)
				.start(
						stepBuilderFactory
						.get("wbsDeltaImportJobStep")
						.chunk(1)
						.reader(readWbsDeltaFromStagingTable())
						.processor(new PassThroughItemProcessor())
						.writer(writeToWbsTable())
						.build())
				.build();
	}

	@Bean
	ItemReader<InboundRequest> readWbsDeltaFromStagingTable() {
		return new ItemReader<InboundRequest>() {
			@Override
			public InboundRequest read()
					throws Exception, UnexpectedInputException, ParseException, NonTransientResourceException {
				return inboundStagingService.getInboundRequestForImport(InboundRequestType.INBOUND_SAP_WBS);
			}
		};
	}

	@Bean
	public ItemWriter<InboundRequest> writeToWbsTable() {
		return new ItemWriter<InboundRequest>() {
			@Override
			public void write(List<? extends InboundRequest> items) throws Exception {

				if (CollectionUtils.isNotEmpty(items)) {
					items.forEach(item -> {
						inboundStagingService.processWbsRequest(item);
					});
				}
			}

		};

	}

}
