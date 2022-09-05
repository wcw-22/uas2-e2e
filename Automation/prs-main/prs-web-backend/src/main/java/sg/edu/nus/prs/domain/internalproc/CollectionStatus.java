package sg.edu.nus.prs.domain.internalproc;

import com.fasterxml.jackson.annotation.JsonValue;

public enum CollectionStatus {

	COLL_STS_PENDING_VERIFICATION("Pending Verification"),
	COLL_STS_PENDING_COLLECTION("Pending Collection"),
	COLL_STS_COLLECTED("Collected"),
	COLL_STS_CANCELLED("Cancelled"),
	COLL_STS_REJECTED("Rejected");

    private String description;

    CollectionStatus(String description) {
        this.description = description;
    }

    @JsonValue
    public String getDescription() {
        return description;
    }

    public static CollectionStatus fromDescription(String description) {
        for (CollectionStatus e: CollectionStatus.values()) {
            if (e.description.equals(description)) {
                return e;
            }
        }

        return null;
    }

}
