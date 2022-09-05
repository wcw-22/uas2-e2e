package sg.edu.nus.prs.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.stereotype.Repository;

import sg.edu.nus.prs.domain.common.Supplier;
import sg.edu.nus.prs.util.Constants;

@Repository
public class SupplierDAOImpl extends BaseDAOImpl implements SupplierDAO {

	@Override
	public int insertSupplier(Supplier supplier) {
		
		if (null == supplier) {
			throw new IllegalArgumentException("Supplier list is required.");
		}

		StringBuilder sql = new StringBuilder();
		sql.append("insert into PRSSUPPLIER (SUPP_C, SUPP_T, CTRY_C, DEFUNCT_F) ");
		sql.append("values (:supplierCode, :supplierName, :countryCode, 'N' ) ");
		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("supplierCode", supplier.getSupplierCode());
		params.addValue("supplierName", supplier.getSupplierName());
		params.addValue("countryCode", supplier.getCountryCode());
		params.addValue("defunctFlag", Constants.NO);

		return prsNamedJdbcTemplate.update(sql.toString(), params);
	}

	@Override
	public int updateSupplier(Supplier supplier) {
		
		if (null == supplier) {
			throw new IllegalArgumentException("Supplier list is required.");
		}

		StringBuilder sql = new StringBuilder();
		sql.append("update PRSSUPPLIER ");
		sql.append("set SUPP_T = :supplierName, CTRY_C = :countryCode ");
		sql.append("where SUPP_C = :supplierCode and nvl(DEFUNCT_F, 'N') <> 'Y' ");
		
		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("supplierCode", supplier.getSupplierCode());
		params.addValue("supplierName", supplier.getSupplierName());
		params.addValue("countryCode", supplier.getCountryCode());

		return prsNamedJdbcTemplate.update(sql.toString(), params);

	}

	@Override
	public int deleteSupplier(Supplier supplier) {
		
		if (null == supplier) {
			throw new IllegalArgumentException("Supplier list is required.");
		}

		StringBuilder sql = new StringBuilder();
		sql.append("update PRSSUPPLIER set DEFUNCT_F = 'Y' where SUPP_C = :supplierCode and nvl(DEFUNCT_F, 'N') <> 'Y' ");

		MapSqlParameterSource params = new MapSqlParameterSource();
		params.addValue("supplierCode", supplier.getSupplierCode());
		
		return prsNamedJdbcTemplate.update(sql.toString(), params);
	}

	@Override
	public boolean isExist(String supplierCode) {
		
		if (StringUtils.isNotEmpty(supplierCode)) {
			StringBuilder sql = new StringBuilder();
			sql.append("select SUPP_C from PRSSUPPLIER where nvl(DEFUNCT_F, 'N') <> 'Y' AND SUPP_C = :supplierCode ");
			
			MapSqlParameterSource params = new MapSqlParameterSource();
			params.addValue("supplierCode", supplierCode);

			List<String> result = prsNamedJdbcTemplate.query(sql.toString(), params, this::suppliserCodeRowMapper);
			
			if(CollectionUtils.isNotEmpty(result)) {
				return true;
			}
		}
		
		return false;
	}
	
	String suppliserCodeRowMapper(ResultSet rs, int i) throws SQLException {
		return rs.getString("SUPP_C");
	}
	
	

}
