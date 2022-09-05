package sg.edu.nus.prs.dao;

import java.util.List;

public interface BatchJobDAO {
    List<Long> getBatchJobsToRestart();
}
