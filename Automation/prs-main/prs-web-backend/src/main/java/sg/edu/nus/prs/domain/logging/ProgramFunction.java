package sg.edu.nus.prs.domain.logging;

public enum ProgramFunction {
    PROG_FN_LOGIN    ("User Login"),
    PROG_FN_LOGOUT   ("User Logout"),
    PROG_FN_USERACCESS ("User Access"),
    PROG_FN_PURCHASEREQ ("Purchase Requisition"),
    PROG_FN_DELEGATION ("Delegation Management"),
    PROG_FN_GOODSRECEIPT ("Goods Receipt"),
	PROG_FN_AORAPPVR ("AOR Approver"),
	PROG_FN_FIXDELVADDR ("Fixed Delivery Address"),
    PROG_FN_INTERNAL_PROCUREMENT ("Internal Procurement"),
    PROG_FN_PERIOD_CONTRACT ("Period Contract");

    private String description;

    ProgramFunction(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
