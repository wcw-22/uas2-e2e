package sg.edu.nus.prs.domain.common;

import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PhyForm {
	private String code;
	private String description;
	
	private List<UnitMsr> unitOfMeasures;

	public PhyForm() { }

	public PhyForm(String code, String description) {
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
	public List<UnitMsr> getUnitOfMeasures() {
		return unitOfMeasures;
	}
	public void setUnitOfMeasures(List<UnitMsr> unitOfMeasures) {
		this.unitOfMeasures = unitOfMeasures;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		PhyForm phyForm = (PhyForm) o;
		return Objects.equals(getCode(), phyForm.getCode());
	}

	@Override
	public int hashCode() {
		return Objects.hash(getCode());
	}
}
