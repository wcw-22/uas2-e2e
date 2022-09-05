package sg.edu.nus.prs.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import sg.edu.nus.prs.domain.internalproc.Collection;
import sg.edu.nus.prs.domain.internalproc.CollectionRemark;
import sg.edu.nus.prs.domain.internalproc.CollectionStatus;
import sg.edu.nus.prs.domain.purchase.Journal;
import sg.edu.nus.prs.domain.purchase.Request;

@Repository
public class CollectionDAOImpl extends BaseDAOImpl implements CollectionDAO {
	@Override
	public Collection saveCollection(Collection collection) {
		collection.setLastModified(new Date());

		if (StringUtils.isBlank(collection.getId())) {
			// New Collection.
			collection.setCreated(new Date());

			String insertSqlStmt = "INSERT INTO prs_collection (\n"
					+ "    COLLECT_N, COLLECT_STS_C, PR_N, REC_CREATE_DTM, REC_UPD_DTM\n" + ") VALUES (\n"
					+ "    prs_collection_seq.NEXTVAL, :collectionStatus, :requestNo, :createdDate, :lastModified\n"
					+ ")";

			MapSqlParameterSource params = new MapSqlParameterSource();
			params.addValue("collectionStatus", collection.getCollectionStatus().toString());
			params.addValue("requestNo", collection.getRequestId());
			params.addValue("createdDate", collection.getCreated());
			params.addValue("lastModified", collection.getLastModified());

			KeyHolder keyHolder = new GeneratedKeyHolder();
			this.prsNamedJdbcTemplate.update(insertSqlStmt, params, keyHolder, new String[] { "COLLECT_N" });

			if (keyHolder.getKeyList() == null || keyHolder.getKeyList().size() < 1) {
				throw new IllegalStateException("No Keyholder value returned for COLLECT_N");
			}

			Map<String, Object> keyHolderMap = keyHolder.getKeyList().get(0);
			collection.setId(keyHolderMap.get("COLLECT_N").toString());

		} else {
			// Existing collection.
			String updateSqlStmt = "UPDATE prs_collection SET\n" + "    COLLECT_STS_C = :collectionStatus,\n"
					+ "    REC_UPD_DTM = SYSDATE,\n" + "    REC_UPDSTF_N = :lastModifiedByStaffNumber\n" + "WHERE\n"
					+ "    COLLECT_N = :collectionId";

			MapSqlParameterSource params = new MapSqlParameterSource();
			params.addValue("collectionStatus", collection.getCollectionStatus().toString());
			params.addValue("lastModifiedByStaffNumber", collection.getLastModifiedByStaffNumber());
			params.addValue("collectionId", collection.getId());

			this.prsNamedJdbcTemplate.update(updateSqlStmt, params);
		}

		return collection;
	}

	@Override
	public Collection getCollectionForRequest(Request request) {
		String collectionSelectSql = "SELECT\n"
				+ "\tCOLLECT_N, COLLECT_STS_C, PR_N, REC_CREATE_DTM, REC_UPD_DTM, REC_UPDSTF_N\n" + "FROM\n"
				+ "\tprs_collection\n" + "WHERE\n" + "\tPR_N = ?";

		String collectionRemarksSelectSql = "SELECT\n"
				+ "\tCOLLECT_REMK_N, COLLECT_REMK_T, REC_CREATEUSER_I, REC_CREATE_DTM, COLLECT_N, COLLECT_STS_C\n"
				+ "FROM\n" + "\tprs_collection_remark\n" + "WHERE\n" + "\tCOLLECT_N = ?\n" + "ORDER BY\n"
				+ "\trec_create_dtm";

		List<Collection> collections = this.prsJdbcTemplate.query(collectionSelectSql, this::collectionRowMapper,
				request.getId());

		if (CollectionUtils.isNotEmpty(collections)) {
			Collection collection = collections.get(0);

			List<CollectionRemark> collectionRemarks = this.prsJdbcTemplate.query(collectionRemarksSelectSql,
					this::collectionRemarkRowMapper, collection.getId());

			collection.setRemarks(collectionRemarks);

			return collection;
		}

		return null;
	}

	Collection collectionRowMapper(ResultSet rs, int i) throws SQLException {
		Collection collection = new Collection();
		collection.setId(rs.getString("COLLECT_N"));
		collection.setCollectionStatus(CollectionStatus.valueOf(rs.getString("COLLECT_STS_C")));
		collection.setRequestId(rs.getString("PR_N"));
		collection.setCreated(rs.getDate("REC_CREATE_DTM"));
		collection.setLastModified(rs.getDate("REC_UPD_DTM"));
		collection.setLastModifiedByStaffNumber(rs.getString("REC_UPDSTF_N"));

		return collection;
	}

	CollectionRemark collectionRemarkRowMapper(ResultSet rs, int i) throws SQLException {
		CollectionRemark remark = new CollectionRemark();
		remark.setId(rs.getString("COLLECT_REMK_N"));
		remark.setRemark(rs.getString("COLLECT_REMK_T"));
		remark.setUserNo(rs.getString("REC_CREATEUSER_I"));
		remark.setCreated(rs.getDate("REC_CREATE_DTM"));
		remark.setCollectionId(rs.getString("COLLECT_N"));
		remark.setStatus(CollectionStatus.valueOf(rs.getString("COLLECT_STS_C")));

		return remark;
	}

	@Override
	public CollectionRemark saveCollectionRemark(CollectionRemark remark) {
		remark.setCreated(new Date());

		if (StringUtils.isBlank(remark.getId())) {
			// New remark.
			String insertSqlStmt = "INSERT INTO prs_collection_remark (\n"
					+ "    COLLECT_REMK_N, COLLECT_REMK_T, REC_CREATEUSER_I, REC_CREATE_DTM, COLLECT_N, COLLECT_STS_C\n"
					+ ") VALUES (\n"
					+ "    prs_collection_remark_seq.NEXTVAL, :remark, :userNo, :createdDate, :collectionId, :collectionStatus \n"
					+ ")";

			MapSqlParameterSource params = new MapSqlParameterSource();
			params.addValue("remark", remark.getRemark());
			params.addValue("userNo", remark.getUserNo());
			params.addValue("createdDate", remark.getCreated());
			params.addValue("collectionId", remark.getCollectionId());
			params.addValue("collectionStatus", remark.getStatus().toString());

			KeyHolder keyHolder = new GeneratedKeyHolder();
			this.prsNamedJdbcTemplate.update(insertSqlStmt, params, keyHolder, new String[] { "COLLECT_REMK_N" });

			if (keyHolder.getKeyList() == null || keyHolder.getKeyList().size() < 1) {
				throw new IllegalStateException("No Keyholder value returned for COLLECT_REMK_N");
			}

			Map<String, Object> keyHolderMap = keyHolder.getKeyList().get(0);
			remark.setId(keyHolderMap.get("COLLECT_REMK_N").toString());

		} else {
			// Updating existing remark.
			String updateSqlStmt = "UPDATE prs_collection_remark SET\n" + "    COLLECT_REMK_T = :remark,\n"
					+ "    REC_CREATEUSER_I = :userNo,\n" + "    REC_CREATE_DTM = SYSDATE\n" + "WHERE\n"
					+ "    COLLECT_REMK_N = :remarkId";

			MapSqlParameterSource params = new MapSqlParameterSource();
			params.addValue("remark", remark.getRemark());
			params.addValue("userNo", remark.getUserNo());
			params.addValue("remarkId", remark.getId());

			this.prsNamedJdbcTemplate.update(updateSqlStmt, params);
		}

		return remark;
	}

	@Override
	public List<Journal> saveJournal(List<Journal> journals) {

		if (CollectionUtils.isEmpty(journals)) {
			return Collections.emptyList();
		}

		for (Journal journal : journals) {
			StringBuilder sql = new StringBuilder()
			.append("insert into PRS_JOURNAL (JRNL_N, COLLECT_N, AC_N, WBS_AC_N, GL_AC_N, JRNL_ITEMSEQ_N, JRNL_DBCR_C, JRNL_ITEM_A, JRNL_ITEMDESC_T, REC_CREATESTF_N, REC_CREATE_DTM ) ")
			.append("values (PRS_JOURNAL_SEQ.nextVal, :collectionId, :accountAssignmentId, :wbsAccountNumber, :glAccountNumber, :lineItemNumber, :journalType, :journalAmount, :itemText, :createUserNo, sysdate) ");

			MapSqlParameterSource params = new MapSqlParameterSource();
			params.addValue("collectionId", journal.getCollectionId());
			params.addValue("accountAssignmentId", journal.getAccountAssignmentId());
			params.addValue("wbsAccountNumber", journal.getWbsAccountNumber());
			params.addValue("glAccountNumber", journal.getGlAccountNumber());
			params.addValue("lineItemNumber", journal.getLineItemNumber());
			params.addValue("journalType", journal.getType().name());
			params.addValue("journalAmount", journal.getAmount());
			params.addValue("itemText", journal.getItemText());
			params.addValue("createUserNo", journal.getCreateUserNo());
			
			KeyHolder keyHolder = new GeneratedKeyHolder();
			int result = this.prsNamedJdbcTemplate.update(sql.toString(), params, keyHolder, new String[] { "JRNL_N" });

			if (keyHolder.getKeyList() == null || keyHolder.getKeyList().size() < 1) {
				throw new IllegalStateException("No Keyholder value returned for JRNL_N");
			}

			Map<String, Object> keyHolderMap = keyHolder.getKeyList().get(0);
			journal.setId(keyHolderMap.get("JRNL_N").toString());

			if (result <= 0) {
				return Collections.emptyList();
			}
		};

		return journals;

	}

}
