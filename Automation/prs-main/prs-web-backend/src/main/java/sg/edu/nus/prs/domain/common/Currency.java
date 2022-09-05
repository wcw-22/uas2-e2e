package sg.edu.nus.prs.domain.common;

public class Currency {
	private String code;
	private String description;
	private Boolean decimalCurrency;

	public Currency() {
		super();
	}

	public Currency(String code, String description) {
		super();
		this.code = code;
		this.description = description;
	}
	
	public Currency(String code, String description, Boolean decimalCurrency) {
		super();
		this.code = code;
		this.description = description;
		this.decimalCurrency = decimalCurrency;
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

	public Boolean isDecimalCurrency() {
		return decimalCurrency;
	}

	public void setDecimalCurrency(Boolean decimalCurrency) {
		this.decimalCurrency = decimalCurrency;
	}


}
