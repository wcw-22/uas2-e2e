package sg.edu.nus.prs.domain.logging;

public class TransactionLog {
    private String userId;
    private ProgramFunction function;
    private TransactionType transactionType;
    private String ipAddress;
    private String beforeImage;
    private String afterImage;

    public TransactionLog(){}

    public TransactionLog(String userId,
                          ProgramFunction function,
                          TransactionType transactionType) {
        this.userId = userId;
        this.function = function;
        this.transactionType = transactionType;
    }

    public TransactionLog(String userId,
                          ProgramFunction function,
                          TransactionType transactionType,
                          String beforeImage,
                          String afterImage){
        this(userId, function, transactionType);
        this.setBeforeImage(beforeImage);
        this.setAfterImage(afterImage);
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public ProgramFunction getFunction() {
        return function;
    }

    public void setFunction(ProgramFunction function) {
        this.function = function;
    }

    public TransactionType getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(TransactionType transactionType) {
        this.transactionType = transactionType;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public String getBeforeImage() {
        return beforeImage;
    }

    public void setBeforeImage(String beforeImage) {
        this.beforeImage = beforeImage;
    }

    public String getAfterImage() {
        return afterImage;
    }

    public void setAfterImage(String afterImage) {
        this.afterImage = afterImage;
    }
}
