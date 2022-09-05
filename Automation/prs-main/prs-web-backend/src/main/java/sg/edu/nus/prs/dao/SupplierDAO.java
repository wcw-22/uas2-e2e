package sg.edu.nus.prs.dao;

import sg.edu.nus.prs.domain.common.Supplier;

public interface SupplierDAO {
	
	public int insertSupplier(Supplier supplier);
	
	public int updateSupplier(Supplier supplier);
	
	public int deleteSupplier(Supplier supplier);
	
	public boolean isExist(String supplierCode);
}
