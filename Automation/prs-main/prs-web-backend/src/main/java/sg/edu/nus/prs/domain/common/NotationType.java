package sg.edu.nus.prs.domain.common;

import com.fasterxml.jackson.annotation.JsonValue;
import org.apache.commons.lang3.StringUtils;

public enum NotationType {
    SCIENTIFIC_FORM     ("1", "SCIENTIFIC FORM"),
    REAL_NUMBER_FORM    ("2", "REAL NUMBER FORM");

    private String notationTypeCode;
    private String notationTypeDescription;

    NotationType(String notationTypeCode, String notationTypeDescription) {
        this.notationTypeCode = notationTypeCode;
        this.notationTypeDescription = notationTypeDescription;
    }

    public String getNotationTypeCode() {
        return notationTypeCode;
    }

    @JsonValue
    public String getNotationTypeDescription() {
        return notationTypeDescription;
    }

    public static NotationType getNotationType(String code) {
        for (NotationType nt: NotationType.values()) {
            if (StringUtils.equals(code, nt.getNotationTypeCode())) {
                return nt;
            }
        }

        return null;
    }
}
