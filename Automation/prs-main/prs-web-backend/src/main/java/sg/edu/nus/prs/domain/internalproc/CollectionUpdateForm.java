package sg.edu.nus.prs.domain.internalproc;

public class CollectionUpdateForm {
    private String requestId;
    private CollectionEvent event;
    private String remark;

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
        if (this.remark != null) {
            this.remark = this.remark.trim();
        }
    }
}
