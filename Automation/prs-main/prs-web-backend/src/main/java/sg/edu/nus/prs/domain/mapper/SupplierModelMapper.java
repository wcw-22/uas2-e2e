package sg.edu.nus.prs.domain.mapper;

import org.springframework.stereotype.Component;

import sg.edu.nus.prs.domain.common.Supplier;
import sg.edu.nus.prs.http.sap.domain.SupplierData;

@Component
public class SupplierModelMapper {
	
	public Supplier intObjectToDomainObject(SupplierData intObj) {
		Supplier supplier = new Supplier();
		supplier.setSupplierCode(intObj.getCompanyId());
		supplier.setSupplierName(intObj.getCompanyName());
		supplier.setCountryCode(intObj.getCountryCode());

		return supplier;
	}
}
