package sg.edu.nus.prs.dao;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;
import sg.edu.nus.prs.domain.logging.TransactionLog;

import java.sql.Types;

@Repository
public class AuditDAOImpl extends BaseDAOImpl implements AuditDAO {

    @Override
    public void addTransactionLog(TransactionLog log) {
        if (log == null) {
            throw new IllegalArgumentException("Transaction log is required.");
        }
        if (StringUtils.isEmpty(log.getUserId())) {
            throw new IllegalArgumentException("User ID is required.");
        }
        if (log.getFunction() == null) {
            throw new IllegalArgumentException("Program Function is required.");
        }

        String insertLogSQL =
                "INSERT INTO PRS_TRAN_LOG (\n" +
                "    LOG_TRAN_N,\n" +
                "    TRAN_TP_C, TRAN_DTM,\n" +
                "    PROG_FUNC_C,\n" +
                "    USER_I, USER_IPADDR_T,\n" +
                "    TRAN_BF_T, TRAN_AF_T \n" +
                ") VALUES (\n" +
                "    PRS_TRAN_LOG_SEQ.NEXTVAL,\n" +
                "    ?, SYSDATE,\n" +
                "    ?, \n" +
                "    ?, ?,\n" +
                "    ?, ? \n" +
                ")";

        String transactionType = null;
        if (log.getTransactionType() != null) {
            transactionType = log.getTransactionType().toString();
        }


        this.prsJdbcTemplate.update(insertLogSQL,
                new Object[]{
                    transactionType,
                    log.getFunction().toString(),
                    log.getUserId().toUpperCase(), log.getIpAddress(),
                    log.getBeforeImage(), log.getAfterImage()
                },
                new int[]{
                    Types.VARCHAR,
                    Types.VARCHAR,
                    Types.VARCHAR,
                    Types.VARCHAR,
                    Types.CLOB, Types.CLOB
        });
    }
}
