package sg.edu.nus.prs.domain.common;

import java.util.Objects;

public class UnitMsr {

	private String code;
	private String description;
	private String abbreviation;
	
	public UnitMsr() {
		
	}
	
	public UnitMsr(String code, String description, String abbreviation) {
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

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		UnitMsr unitMsr = (UnitMsr) o;
		return Objects.equals(getCode(), unitMsr.getCode());
	}

	@Override
	public int hashCode() {
		return Objects.hash(getCode());
	}
}
