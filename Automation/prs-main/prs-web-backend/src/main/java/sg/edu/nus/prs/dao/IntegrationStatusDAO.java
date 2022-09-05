package sg.edu.nus.prs.dao;

import sg.edu.nus.prs.domain.logging.IntegrationStatusLog;

public interface IntegrationStatusDAO {

	String addIntegrationStatusLog(IntegrationStatusLog integrationStatusLog);

	void updateIntegrationStatusLog(IntegrationStatusLog log);
	
	String getIntegrationStatusLog(String integrationStatusId);

}
