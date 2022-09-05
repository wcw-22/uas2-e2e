package sg.edu.nus.prs.domain.logging;

import java.util.Date;

public class IntegrationStatusLog {
	private String id;
	private IntegrationDirection integrationDirection;
	private String endPointUrl;
	private String hostName;
	private int httpStatus;
	private long duration;
	private String requestPayload;
	private String responsePayload;
	private Date transactionDate;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public IntegrationDirection getIntegrationDirection() {
		return integrationDirection;
	}

	public void setIntegrationDirection(IntegrationDirection integrationDirection) {
		this.integrationDirection = integrationDirection;
	}

	public String getEndPointUrl() {
		return endPointUrl;
	}
	public void setEndPointUrl(String endPointUrl) {
		this.endPointUrl = endPointUrl;
	}
	public String getHostName() {
		return hostName;
	}
	public void setHostName(String hostName) {
		this.hostName = hostName;
	}
	public int getHttpStatus() {
		return httpStatus;
	}
	public void setHttpStatus(int httpStatus) {
		this.httpStatus = httpStatus;
	}
	public long getDuration() {
		return duration;
	}
	public void setDuration(long duration) {
		this.duration = duration;
	}
	public String getRequestPayload() {
		return requestPayload;
	}
	public void setRequestPayload(String requestPayload) {
		this.requestPayload = requestPayload;
	}

	public String getResponsePayload() {
		return responsePayload;
	}

	public void setResponsePayload(String responsePayload) {
		this.responsePayload = responsePayload;
	}

	public Date getTransactionDate() {
		return transactionDate;
	}
	public void setTransactionDate(Date transactionDate) {
		this.transactionDate = transactionDate;
	}
}
