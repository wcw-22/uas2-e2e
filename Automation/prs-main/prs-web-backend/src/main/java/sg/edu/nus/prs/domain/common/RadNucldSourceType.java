package sg.edu.nus.prs.domain.common;

public class RadNucldSourceType {

	private String code;
	private String description;
	
	
	
	public RadNucldSourceType() {
		super();
	}

	public RadNucldSourceType(String code, String description) {
		super();
		this.code = code;
		this.description = description;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	
}
