package sg.edu.nus.prs.dao;

import sg.edu.nus.prs.domain.common.WBSAccount;
import sg.edu.nus.prs.domain.common.WBSAccountSearchInput;

import java.util.List;

public interface WBSAccountDAO {
	List<WBSAccount> getWBSAccount(String accountNumber, List<String> supplierCodes);

	List<WBSAccount> searchWBSAccounts(WBSAccountSearchInput searchInput);

    int insertWBSAccount(WBSAccount wbsAccount);
	
	int updateWBSAccount(WBSAccount wbsAccount);
	
	int deleteWBSAccount(WBSAccount wbsAccount);
	
	boolean isExist(String wbsAccountNumber, String srceSysC);
}
