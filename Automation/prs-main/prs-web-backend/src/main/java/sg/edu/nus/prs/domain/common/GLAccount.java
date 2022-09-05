package sg.edu.nus.prs.domain.common;

public class GLAccount {
    private String glAccount;
    private String description;
    private boolean defaultAccount;
    private GLAccountType glAccountType;

    public String getGlAccount() {
        return glAccount;
    }

    public void setGlAccount(String glAccount) {
        this.glAccount = glAccount;
    }

    public boolean isDefaultAccount() {
        return defaultAccount;
    }

    public void setDefaultAccount(boolean defaultAccount) {
        this.defaultAccount = defaultAccount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

	public GLAccountType getGlAccountType() {
		return glAccountType;
	}

	public void setGlAccountType(GLAccountType glAccountType) {
		this.glAccountType = glAccountType;
	}
    
}
