package sg.edu.nus.prs.dao;

import sg.edu.nus.prs.domain.inbound.InboundRequest;
import sg.edu.nus.prs.domain.inbound.InboundRequestType;

public interface InboundStagingDAO {
	
	public void addStagingRequest(InboundRequest request);
	
	public void updateStagingRequeststatus(InboundRequest request);
	
	public InboundRequest getInboundRequestsForImport(InboundRequestType inboundRequestType);
	
}
