package sg.edu.nus.prs.domain.logging;

public enum TransactionType {
    TRN_TP_INS ("Insert"),
    TRN_TP_UPD ("Update"),
    TRN_TP_DEL ("Delete");

    private String description;

    TransactionType(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
