package sg.edu.nus.prs.batch.job;

import java.util.List;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobExecutionListener;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.core.launch.support.SimpleJobLauncher;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.NonTransientResourceException;
import org.springframework.batch.item.ParseException;
import org.springframework.batch.item.UnexpectedInputException;
import org.springframework.batch.item.support.PassThroughItemProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.SimpleAsyncTaskExecutor;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import sg.edu.nus.prs.domain.inbound.InboundRequest;
import sg.edu.nus.prs.domain.inbound.InboundRequestType;
import sg.edu.nus.prs.service.InboundStagingService;

@Configuration
public class SupplierDeltaImportJobConfig {
	private final JobBuilderFactory jobBuilderFactory;
	private final StepBuilderFactory stepBuilderFactory;
	private final InboundStagingService inboundStagingService;
	private final JobExecutionListener jobExecutionListener;

	public SupplierDeltaImportJobConfig(JobBuilderFactory jobBuilderFactory,
										StepBuilderFactory stepBuilderFactory,
										InboundStagingService inboundStagingService,
										@Qualifier("prsJobExecutionListener") JobExecutionListener jobExecutionListener) {
		this.jobBuilderFactory = jobBuilderFactory;
		this.stepBuilderFactory = stepBuilderFactory;
		this.inboundStagingService = inboundStagingService;
		this.jobExecutionListener = jobExecutionListener;
	}

	@SuppressWarnings("unchecked")
	@Bean(name = "supplierDeltaImportJob")
	public Job supplierDeltaImportJob() {
		return jobBuilderFactory.get("supplierDeltaImportJob").incrementer(new RunIdIncrementer())
				.listener(jobExecutionListener)
				.start(
						stepBuilderFactory
						.get("supplierDeltaImportJobStep")
						.chunk(1)
						.reader(readSupplierDeltaFromStagingTable())
						.processor(new PassThroughItemProcessor())
						.writer(writeToSupplierTable())
						.build())

				.build();
	}

	@Bean
	ItemReader<InboundRequest> readSupplierDeltaFromStagingTable() {
		return new ItemReader<InboundRequest>() {
			@Override
			public InboundRequest read()
					throws Exception, UnexpectedInputException, ParseException, NonTransientResourceException {
				return inboundStagingService
						.getInboundRequestForImport(InboundRequestType.INBOUND_SUPPLIER);
			}
		};
	}
	
	@Bean
	public ItemWriter<InboundRequest> writeToSupplierTable() {
		return new ItemWriter<InboundRequest>() {
			@Override
			public void write(List<? extends InboundRequest> items) throws Exception {
				if (CollectionUtils.isNotEmpty(items)) {
					items.forEach(item -> {
						inboundStagingService.processSupplierRequest(item);

					});
				}

			}
		};

	}

}
