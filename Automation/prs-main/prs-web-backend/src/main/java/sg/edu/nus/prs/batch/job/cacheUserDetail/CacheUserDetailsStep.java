package sg.edu.nus.prs.batch.job.cacheUserDetail;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.collections4.ListUtils;
import org.apache.commons.lang3.StringUtils;
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

import sg.edu.nus.prs.domain.user.StaffDetail;
import sg.edu.nus.prs.domain.user.StudentDetail;
import sg.edu.nus.prs.service.StaffSAPService;
import sg.edu.nus.prs.service.StudentService;
import sg.edu.nus.prs.service.UserDetailService;
import sg.edu.nus.prs.util.Constants;

@Component
public class CacheUserDetailsStep implements Tasklet, StepExecutionListener {

	private static final Logger logger = LoggerFactory.getLogger(CacheUserDetailsStep.class);

	private StaffSAPService staffSAPService;
	private StudentService studentService;
	private UserDetailService userDetailService;

	@Autowired
	public CacheUserDetailsStep(StaffSAPService staffSAPService, StudentService studentService,
			UserDetailService userDetailService) {
		this.staffSAPService = staffSAPService;
		this.studentService = studentService;
		this.userDetailService = userDetailService;
	}

	@Override
	public void beforeStep(StepExecution stepExecution) {
	}

	@Override
	public ExitStatus afterStep(StepExecution stepExecution) {
		return ExitStatus.COMPLETED;
	}

	@Override
	public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) {

		logger.info("CacheUserDetailsStep - execute");

		List<String> staffStudentNos = userDetailService.getStaffStudentNosForCache();

		if (CollectionUtils.isEmpty(staffStudentNos)) {
			staffSAPService.setStaffCacheLoaded();
			return RepeatStatus.FINISHED;
		}

		logger.info("Staff and student records in LMPRS: " + staffStudentNos.size());

		List<String> staffNos = staffStudentNos.stream()
				.filter(s -> StringUtils.isNotEmpty(s) && Character.isDigit(s.trim().charAt(0)))
				.filter(s -> !StringUtils.equals(Constants.SYSTEM_USER, s)) // <- Filter out system user.
				.collect(Collectors.toList());

		if (CollectionUtils.isNotEmpty(staffNos)) {

			logger.info("Staff records in LMPRS: " + staffNos.size());

			List<List<String>> staffNoLists = ListUtils.partition(staffNos, Constants.DEFAULT_STAFF_BATCH_SIZE);

			if (CollectionUtils.isNotEmpty(staffNoLists)) {
				List<List<StaffDetail>> staffDetailLists = staffNoLists.stream()
						.map(staffNoList -> staffSAPService.getStaffs(staffNoList))
						.collect(Collectors.toList());

				if (CollectionUtils.isNotEmpty(staffDetailLists)) {
					
					List<StaffDetail> staffDetails = staffDetailLists.stream()
							.flatMap(Collection::stream)
							.collect(Collectors.toList());

					logger.info("Staff records returned from ESB: " + staffDetails.size());

					if (CollectionUtils.isNotEmpty(staffDetails)) {
						staffDetails.forEach(s -> {
							if (null != s && StringUtils.isNotEmpty(s.getStaffNo())) {
								staffSAPService.cacheStaff(s);
							}
						});
					}
				}

			}
		}

		List<String> studentMatrics = staffStudentNos.stream()
				.filter(s -> StringUtils.isNotEmpty(s) && Character.isLetter(s.trim().charAt(0)))
				.collect(Collectors.toList());

		if (CollectionUtils.isNotEmpty(studentMatrics)) {

			logger.info("Student records in LMPRS: " + studentMatrics.size());

			if (CollectionUtils.isNotEmpty(studentMatrics)) {
				List<StudentDetail> studentDetails = studentMatrics.stream()
						.map(studentMatric -> studentService.getStudentDetailByMatricNo(studentMatric))
						.collect(Collectors.toList());

				List<StudentDetail> notEmptyStudentDetails = studentDetails
															.stream()
															.filter(Objects::nonNull)
															.collect(Collectors.toList());
				
				logger.info("Student records returned from ESB: " + notEmptyStudentDetails.size());

				if (CollectionUtils.isNotEmpty(notEmptyStudentDetails)) {
					notEmptyStudentDetails.forEach(s -> {
						if (null != s && StringUtils.isNotEmpty(s.getMatricNo()))
							staffSAPService.cacheStudent(s);
					});
				}
			}
		}

		staffSAPService.setStaffCacheLoaded();

		return RepeatStatus.FINISHED;
	}
}
