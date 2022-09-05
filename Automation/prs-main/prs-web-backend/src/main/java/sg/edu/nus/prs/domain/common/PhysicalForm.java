package sg.edu.nus.prs.domain.common;

import java.util.List;

public class PhysicalForm {
	private String code;
	private String description;
	private List<UnitMeasure> unitOfMeasures;
	
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
	public List<UnitMeasure> getUnitOfMeasures() {
		return unitOfMeasures;
	}
	public void setUnitOfMeasures(List<UnitMeasure> unitOfMeasures) {
		this.unitOfMeasures = unitOfMeasures;
	}
	
}
