package sg.edu.nus.prs.domain.inbound;

import com.fasterxml.jackson.annotation.JsonValue;

public enum InboundRequestStatus {
	INBOUND_STS_NEW("New"), INBOUND_STS_PROCCESSED("Processed");

	private String description;

	private InboundRequestStatus(String description) {
		this.description = description;
	}

	@JsonValue
	public String getDescription() {
		return description;
	}

	public static InboundRequestStatus fromDescription(String description) {
		for (InboundRequestStatus e : InboundRequestStatus.values()) {
			if (e.description.equals(description)) {
				return e;
			}
		}

		return null;
	}
}
