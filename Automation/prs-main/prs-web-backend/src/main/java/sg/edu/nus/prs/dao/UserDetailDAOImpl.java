package sg.edu.nus.prs.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.stereotype.Repository;

@Repository
public class UserDetailDAOImpl extends BaseDAOImpl implements UserDetailDAO {

	@Override
	public List<String> getStaffStudentIds() {
		
		StringBuilder sql = new StringBuilder();
		
		sql.append("SELECT REQ_STFSTD_N as STFSTD_N FROM PRS_PURCHASE_REQ WHERE REQ_STFSTD_N IS NOT NULL ")
			.append("UNION ")
			.append("SELECT INVNT_OWNERSTF_N FROM PRS_PURCHASE_REQ WHERE INVNT_OWNERSTF_N IS NOT NULL ")
			.append("UNION ")
			.append("SELECT USER_I FROM PRS_USER_ACCESS ")
			.append("UNION ")
			.append("SELECT APPV_USER_I FROM PRS_APPV_STS WHERE APPV_USER_I IS NOT NULL ")
			.append("UNION ")
			.append("SELECT PER_AUTHUSER_I FROM PRS_APPV_STS WHERE PER_AUTHUSER_I IS NOT NULL ")
			.append("UNION ")
			.append("SELECT NOM_USER_I FROM PRS_NOMINEE WHERE NVL(DEFUNCT_F, 'N') <> 'Y' ")
			.append("UNION ")
			.append("SELECT PER_AUTHRUSER_I FROM PRS_NOMINEE WHERE NVL(DEFUNCT_F, 'N') <> 'Y' ");
			
		return prsJdbcTemplate.query(sql.toString(), this::staffStudentIdRowMapper);
	}
	
	String staffStudentIdRowMapper(ResultSet rs, int i) throws SQLException {
		return rs.getString("STFSTD_N");
	}

}
