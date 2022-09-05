package sg.edu.nus.prs.dao;

import sg.edu.nus.prs.domain.user.UserPreference;

public interface UserPreferenceDAO {
    UserPreference save(UserPreference up);

    UserPreference getUserPreference(String userStaffNo);
}
