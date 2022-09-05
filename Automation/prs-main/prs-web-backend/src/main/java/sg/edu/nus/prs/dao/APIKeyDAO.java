package sg.edu.nus.prs.dao;

import sg.edu.nus.prs.domain.security.APIKey;

import java.util.Date;
import java.util.List;

public interface APIKeyDAO {
    List<APIKey> getAPIKeysForAppId(String appId, Date currentDate);
}
