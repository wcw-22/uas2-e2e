package sg.edu.nus.prs.dao;

import org.springframework.stereotype.Repository;
import sg.edu.nus.prs.util.Constants;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class BatchJobDAOImpl extends BaseDAOImpl implements BatchJobDAO {
    @Override
    public List<Long> getBatchJobsToRestart() {
        return this.prsJdbcTemplate.query(
            "SELECT\n" +
                "    ji.job_instance_id, max(to_number(je.job_execution_id)) AS job_execution_id\n" +
                "FROM\n" +
                "    PRS_JOB_INSTANCE ji\n" +
                "    JOIN PRS_JOB_EXECUTION je ON ji.job_instance_id = je.job_instance_id\n" +
                "    JOIN PRS_JOB_EXECUTION_PARAMS jep ON je.job_execution_id = jep.job_execution_id AND jep.key_name = ? and jep.string_val = 'Y'\n" +
                "WHERE\n" +
                "    NOT EXISTS (\n" +
                "        SELECT * FROM PRS_JOB_EXECUTION je2\n" +
                "        WHERE je2.job_instance_id = ji.job_instance_id\n" +
                "        AND je2.status IN ('COMPLETED', 'STARTING', 'STARTED')\n" +
                "    )\n" +
                "GROUP BY\n" +
                "    ji.job_instance_id",
                this::batchJobsToRestartRowMapper,
                Constants.BATCH_JOB_RETRY_UNTIL_SUCCESS
        );
    }

    Long batchJobsToRestartRowMapper(ResultSet rs, int i) throws SQLException {
        return rs.getLong("job_execution_id");
    }
}
