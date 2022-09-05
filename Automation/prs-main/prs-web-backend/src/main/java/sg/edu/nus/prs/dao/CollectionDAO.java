package sg.edu.nus.prs.dao;

import java.util.List;

import sg.edu.nus.prs.domain.internalproc.Collection;
import sg.edu.nus.prs.domain.internalproc.CollectionRemark;
import sg.edu.nus.prs.domain.purchase.Journal;
import sg.edu.nus.prs.domain.purchase.Request;

public interface CollectionDAO {
	Collection saveCollection(Collection collection);

	Collection getCollectionForRequest(Request request);

	CollectionRemark saveCollectionRemark(CollectionRemark remark);

	List<Journal> saveJournal(List<Journal> journals);
}
