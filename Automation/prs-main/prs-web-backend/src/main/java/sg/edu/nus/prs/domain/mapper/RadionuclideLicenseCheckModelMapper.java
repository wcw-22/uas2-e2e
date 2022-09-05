package sg.edu.nus.prs.domain.mapper;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.stereotype.Component;

import sg.edu.nus.prs.domain.common.Result;
import sg.edu.nus.prs.domain.purchase.ChemicalLicenseCheckResult;
import sg.edu.nus.prs.domain.purchase.LicenseCheckResult;
import sg.edu.nus.prs.domain.purchase.RadioactiveLicenceCheckResult;
import sg.edu.nus.prs.domain.purchase.BiologicalLicenceCheckResult;
import sg.edu.nus.prs.http.lmms.domain.LicenceCheckChemical;
import sg.edu.nus.prs.http.lmms.domain.LicenceCheckRadionuclide;
import sg.edu.nus.prs.http.lmms.domain.LicenceCheckStatus;
import sg.edu.nus.prs.http.lmms.domain.LicenceStatus;
import sg.edu.nus.prs.http.lmms.domain.LicenseCheckData;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class RadionuclideLicenseCheckModelMapper{
	public List<RadioactiveLicenceCheckResult> intObjectToDomainObject(LicenseCheckData intObject) {
		if (intObject != null && CollectionUtils.isNotEmpty(intObject.getRadionuclideLicenceStatus())) {
			return intObject.getRadionuclideLicenceStatus().stream()
					.map(this::intObjectToRadionuclideLicenceCheck)
					.collect(Collectors.toList());
		}

		return Collections.emptyList();
	}

	private RadioactiveLicenceCheckResult intObjectToRadionuclideLicenceCheck (LicenceCheckRadionuclide intO) {
		RadioactiveLicenceCheckResult clc = new RadioactiveLicenceCheckResult();
		clc.setRadionuclideId(intO.getRadionuclideId());
		clc.setLineItemNumber(intO.getPrItemNumber());

		clc.setRegulationCheckResults(intO.getStatusMessages().stream()
				.map(this::radionuclideLicenceCheckStatusToLicenseCheckResult)
				.collect(Collectors.toList()));

		boolean allPass = clc.getRegulationCheckResults().stream()
				.allMatch(clcr -> clcr.getResult() == Result.PASS);
		clc.setOverallResult((allPass) ? Result.PASS : Result.FAIL);

		return clc;
	}

	private LicenseCheckResult radionuclideLicenceCheckStatusToLicenseCheckResult  (LicenceCheckStatus intO) {
		LicenseCheckResult clcr = new LicenseCheckResult();
		if (intO.getStatus() == LicenceStatus.ALLOW) {
			clcr.setResult(Result.PASS);
		} else {
			clcr.setResult(Result.FAIL);
		}

		clcr.setMessage(intO.getMessage());
		clcr.setRegulationId(intO.getRegulationId());
		clcr.setRegulationName(intO.getRegulationName());

		return clcr;
	}
}
