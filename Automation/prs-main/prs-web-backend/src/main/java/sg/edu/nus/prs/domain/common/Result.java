package sg.edu.nus.prs.domain.common;

import com.fasterxml.jackson.annotation.JsonValue;

public enum Result {
    PASS ("Pass"),
    FAIL ("Fail");

    private String description;

    Result(String description) {
        this.description = description;
    }

    @JsonValue
    public String getDescription() {
        return description;
    }
}
