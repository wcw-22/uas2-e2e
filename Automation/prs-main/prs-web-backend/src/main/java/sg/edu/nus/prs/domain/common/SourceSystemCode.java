package sg.edu.nus.prs.domain.common;

import org.apache.commons.lang3.StringUtils;

import com.fasterxml.jackson.annotation.JsonValue;

public enum SourceSystemCode {
	SOURCE_SYSTEM_CODE_PO ("LMPRS_PO"),
	SOURCE_SYSTEM_CODE_JL ("LMPRS_JL");

    private String description;

    SourceSystemCode(String description) {
        this.description = description;
    }

    
    public static SourceSystemCode getSourceSystemCode(String description) {
        for (SourceSystemCode st: values()) {
            if (StringUtils.equals(description, st.getDescription())) {
                return st;
            }
        }
        return null;
    }

    @JsonValue
    public String getDescription() {
        return description;
    }
}
