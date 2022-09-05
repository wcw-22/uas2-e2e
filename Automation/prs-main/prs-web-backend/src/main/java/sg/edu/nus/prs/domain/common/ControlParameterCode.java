package sg.edu.nus.prs.domain.common;

import com.fasterxml.jackson.annotation.JsonValue;

public enum ControlParameterCode {

	CFG_PARAM_GST("GST");

	private String description;

	ControlParameterCode(String description) {
		this.description = description;
	}

	@JsonValue
	public String getDescription() {
		return description;
	}
}
