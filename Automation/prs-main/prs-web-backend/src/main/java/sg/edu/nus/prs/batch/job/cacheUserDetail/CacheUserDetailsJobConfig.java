package sg.edu.nus.prs.batch.job.cacheUserDetail;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobExecutionListener;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.listener.JobExecutionListenerSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CacheUserDetailsJobConfig extends JobExecutionListenerSupport {
	private final JobBuilderFactory jobBuilderFactory;
	private final StepBuilderFactory stepBuilderFactory;
	private final CacheUserDetailsStep cacheUserDetailsStep;
	private final JobExecutionListener jobExecutionListener;

	@Autowired
	public CacheUserDetailsJobConfig(JobBuilderFactory jobBuilderFactory,
									 StepBuilderFactory stepBuilderFactory,
									 CacheUserDetailsStep cacheUserDetailsStep,
									 @Qualifier("prsJobExecutionListener") JobExecutionListener jobExecutionListener) {
		this.jobBuilderFactory = jobBuilderFactory;
		this.stepBuilderFactory = stepBuilderFactory;
		this.cacheUserDetailsStep = cacheUserDetailsStep;
		this.jobExecutionListener = jobExecutionListener;
	}

	@Bean
	protected Step getCacheUserDetailsStepStep() {
		return stepBuilderFactory.get("cacheUserDetailsStep").tasklet(cacheUserDetailsStep).build();
	}

	@Bean(name = "cacheUserDetailsJob")
	public Job job() {
		return jobBuilderFactory.get("cacheUserDetailsJob")
				.listener(jobExecutionListener)
				.start(getCacheUserDetailsStepStep()).build();
	}

}
