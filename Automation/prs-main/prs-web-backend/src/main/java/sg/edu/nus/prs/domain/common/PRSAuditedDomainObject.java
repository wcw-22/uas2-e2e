package sg.edu.nus.prs.domain.common;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Date;

public class PRSAuditedDomainObject extends PRSDomainObject {
    @JsonIgnore
    protected String updatedUserId;
    @JsonIgnore
    protected Date updatedDtm;

    public String getUpdatedUserId() {
        return updatedUserId;
    }
    public void setUpdatedUserId(String updatedUserId) {
        this.updatedUserId = updatedUserId;
    }
    public Date getUpdatedDtm() {
        return updatedDtm;
    }
    public void setUpdatedDtm(Date updatedDtm) {
        this.updatedDtm = updatedDtm;
    }
}
