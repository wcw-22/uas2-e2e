package sg.edu.nus.prs.domain.internalproc;

public class CollectionUpdate {
    private String requestId;
    private CollectionEvent event;
    private String remark;
    private String userNo;

    public String getRequestId() {
        return requestId;
    }

    public void setRequestId(String requestId) {
        this.requestId = requestId;
    }

    public CollectionEvent getEvent() {
        return event;
    }

    public void setEvent(CollectionEvent event) {
        this.event = event;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getUserNo() {
        return userNo;
    }

    public void setUserNo(String userNo) {
        this.userNo = userNo;
    }
}
