package sg.edu.nus.prs.dao;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import sg.edu.nus.prs.domain.periodcontract.PeriodContract;
import sg.edu.nus.prs.domain.periodcontract.PeriodContractSearchForm;
import sg.edu.nus.prs.domain.periodcontract.PeriodContractSearchResults;
import sg.edu.nus.prs.domain.periodcontract.PeriodContractStatus;
import sg.edu.nus.prs.domain.periodcontract.PeriodContractSupplier;
import sg.edu.nus.prs.domain.periodcontract.PeriodContractUtilisation;
import sg.edu.nus.prs.domain.purchase.PurchaseLineItem;
import sg.edu.nus.prs.domain.user.Faculty;
import sg.edu.nus.prs.domain.util.PagedData;

public interface PeriodContractDAO {

	PagedData<PeriodContractSearchResults> searchPeriodContract(PeriodContractSearchForm input);

	PeriodContract getPeriodContract(String periodContractNumber);

	PeriodContract savePeriodContract(PeriodContract contract);

	List<String> getPeriodContractIdsByContractNumber(List<String> contractNumbers, List<PeriodContractStatus> statuses);

	boolean unpublishPeriodContract(String periodContractId, String updateUserNo);

	List<PurchaseLineItem> getPeriodContractSupplierAdditionalCharge(String contractNumber, String supplierCode);

	boolean checkPeriodContractProductExists(Date asOf, String contractNumber, String productId, String supplierCode);

	void insertCollectionLineItemContractUtlisation(PeriodContractUtilisation contractUtlisation);

	public List<String> searchContractNumber(String partial, boolean allResults);
	
    PeriodContractSupplier getPeriodContractProduct(Date asOf, String contractNumber, String productId, String supplierCode);

    void insertLineItemContractUtlisation(PeriodContractUtilisation contractUtlisation);

	void insertPurchaseOrderLineItemContractUtlisation(PeriodContractUtilisation contractUtlisation);
	
	List<PeriodContract> fetchToBeExpiredPeriodContractList(String todaysDateStr, List<Long> reminderemailWaitingdays, double firstTriggerLimit, double secondTriggerLimit);

	BigDecimal getRemainingContractValue(String contractNumber);
	
	List<Faculty> getPeriodContractAccess(String sequenceNumber);
	
}
