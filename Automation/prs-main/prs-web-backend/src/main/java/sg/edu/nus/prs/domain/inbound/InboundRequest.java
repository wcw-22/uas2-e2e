package sg.edu.nus.prs.domain.inbound;

import java.util.Date;

public class InboundRequest {

	private String inboundId;
	private InboundRequestType inboundType;
	private String integrationStatusId;
	private String payload;
	private InboundRequestStatus inboundProccessStatus;
	private Date date;
	

	public String getInboundId() {
		return inboundId;
	}

	public void setInboundId(String inboundId) {
		this.inboundId = inboundId;
	}

	public InboundRequestType getInboundType() {
		return inboundType;
	}

	public void setInboundType(InboundRequestType inboundType) {
		this.inboundType = inboundType;
	}

	public String getIntegrationStatusId() {
		return integrationStatusId;
	}

	public void setIntegrationStatusId(String integrationStatusId) {
		this.integrationStatusId = integrationStatusId;
	}

	public InboundRequestStatus getInboundProccessStatus() {
		return inboundProccessStatus;
	}

	public void setInboundProccessStatus(InboundRequestStatus inboundProccessStatus) {
		this.inboundProccessStatus = inboundProccessStatus;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getPayload() {
		return payload;
	}

	public void setPayload(String payload) {
		this.payload = payload;
	}

}
