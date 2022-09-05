package sg.edu.nus.prs.domain.mapper;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;
import sg.edu.nus.prs.domain.periodcontract.PeriodContractSupplierAdditionalCharge;
import sg.edu.nus.prs.domain.periodcontract.PeriodContractSupplierAdditionalChargeForm;

@Component
public class PeriodContractAdditionalChargeModelMapper {

	public PeriodContractSupplierAdditionalCharge toPeriodContractSupplierAdditionalCharge(PeriodContractSupplierAdditionalChargeForm form) {
		if (form == null) {
			return null;
		}

		if (StringUtils.isBlank(form.getAdditionalChargeText())
				&& form.getAdditionalChargeAmount() == null) {
			return null;
		}

		PeriodContractSupplierAdditionalCharge additionalCharge = new PeriodContractSupplierAdditionalCharge();
		additionalCharge.setAdditionalChargeAmount(form.getAdditionalChargeAmount());
		additionalCharge.setAdditionalChargeText(form.getAdditionalChargeText());
		additionalCharge.setAdditionalChargeNumber(form.getAdditionalChargeNumber());

		return additionalCharge;
	}


	public PeriodContractSupplierAdditionalChargeForm domainObjectToForm(PeriodContractSupplierAdditionalCharge additionalCharge) {
		if (additionalCharge == null) {
			return null;
		}

		PeriodContractSupplierAdditionalChargeForm form = new PeriodContractSupplierAdditionalChargeForm();
		form.setAdditionalChargeAmount(additionalCharge.getAdditionalChargeAmount());
		form.setAdditionalChargeText(additionalCharge.getAdditionalChargeText());
		form.setAdditionalChargeNumber(additionalCharge.getAdditionalChargeNumber());
		//form.setSupplierNumber(additionalCharge.getSupplierNumber());
		return form;
	}
	
	/*
	 * public List<PeriodContractSupplierAdditionalChargeForm>
	 * domainObjectToForm(List<PeriodContractSupplierAdditionalCharge>
	 * additionalCharges) { if (CollectionUtils.isNotEmpty(additionalCharges)) {
	 * return additionalCharges.stream() .map(ac -> this.domainObjectToForm(ac))
	 * .collect(Collectors.toList()); } return Collections.emptyList(); }
	 */

}
