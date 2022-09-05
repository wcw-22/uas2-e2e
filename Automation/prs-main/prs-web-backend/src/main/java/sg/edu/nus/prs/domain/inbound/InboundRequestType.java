package sg.edu.nus.prs.domain.inbound;

import com.fasterxml.jackson.annotation.JsonValue;

public enum InboundRequestType {
	INBOUND_SUPPLIER("Supplier Inbound Request"), INBOUND_WBS("WBS Inbound Request"), INBOUND_SAP_WBS("SAP WBS Inbound Request");

	private String description;

	private InboundRequestType(String description) {
		this.description = description;
	}

	@JsonValue
	public String getDescription() {
		return description;
	}

	public static InboundRequestType fromDescription(String description) {
		for (InboundRequestType e : InboundRequestType.values()) {
			if (e.description.equals(description)) {
				return e;
			}
		}

		return null;
	}
}
