package sg.edu.nus.prs.domain.common;

public class UnitMeasure {
	private String code;
	private String description;
	private String abbreviation;
	
	public UnitMeasure() {
		
	}
	
	public UnitMeasure(String code, String description, String abbreviation) {
		this.code = code;
		this.description = description;
		this.abbreviation = abbreviation;
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

	public String getAbbreviation() {
		return abbreviation;
	}

	public void setAbbreviation(String abbreviation) {
		this.abbreviation = abbreviation;
	}
}
