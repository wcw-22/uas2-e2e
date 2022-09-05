package sg.edu.nus.prs.domain.inbound;

import org.apache.commons.lang3.StringUtils;

import com.fasterxml.jackson.annotation.JsonValue;

public enum RecordIndicator {

	NEW("New"), UPDATE("Update"),  DELETE("Delete");

	private String description;

	private RecordIndicator(String description) {
		this.description = description;
	}

	@JsonValue
	public String getDescription() {
		return description;
	}

	public static RecordIndicator fromDescription(String description) {
		for (RecordIndicator e : RecordIndicator.values()) {
			if (e.description.equals(description)) {
				return e;
			}
		}

		return null;
	}
	
	public static boolean contains(String status) {
		
		if(StringUtils.isEmpty(status)) {
			return false;
		}

		for (RecordIndicator recordIndicator : RecordIndicator.values()) {
			if (recordIndicator.name().equals(status)) {
				return true;
			}
		}

		return false;
	}
}
