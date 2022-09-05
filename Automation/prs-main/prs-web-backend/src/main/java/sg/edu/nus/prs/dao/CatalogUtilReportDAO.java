package sg.edu.nus.prs.dao;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import sg.edu.nus.prs.domain.report.CatalogUtilisationDetail;
import sg.edu.nus.prs.domain.report.CatalogUtilisationSummary;
import sg.edu.nus.prs.domain.report.CatalogueUtilReportSearchForm;

public interface CatalogUtilReportDAO {

	List<CatalogUtilisationSummary> getContractDetails(CatalogueUtilReportSearchForm search, String userNumber);
	
	List<CatalogUtilisationDetail> getCatalogUtilisationDetail(Set<String> contractNumbers);
	
	List<CatalogUtilisationDetail> getContractLineItemUtilisation(Set<String> pcPartySeqNums);
	
}
