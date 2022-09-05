package sg.edu.nus.prs.dao;

import sg.edu.nus.prs.domain.logging.TransactionLog;

public interface AuditDAO {
    void addTransactionLog(TransactionLog log);
}
