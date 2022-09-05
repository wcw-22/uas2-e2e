package sg.edu.nus.prs.domain.common;

import java.math.BigDecimal;

public class ConversionRule {
    /*
     Eg. Convert 1L to 1000ml
     [QTY] fromUnitCode = [QTY]*[Rate] toUnitCode
     [1] fromUnitCode = [1]*[1000] toUnitCode
     */

    private String fromUnitCode;
    private String toUnitCode;
    private BigDecimal rate;
    private String physicalFormCode;
    
    

    public ConversionRule(String fromUnitCode, String toUnitCode, BigDecimal rate, String physicalFormCode) {
		super();
		this.fromUnitCode = fromUnitCode;
		this.toUnitCode = toUnitCode;
		this.rate = rate;
		this.physicalFormCode = physicalFormCode;
	}
    
    

	public ConversionRule(String fromUnitCode, String toUnitCode, BigDecimal rate) {
		super();
		this.fromUnitCode = fromUnitCode;
		this.toUnitCode = toUnitCode;
		this.rate = rate;
	}


	
	public ConversionRule() {
		super();
	}



	public String getFromUnitCode() {
        return fromUnitCode;
    }

    public void setFromUnitCode(String fromUnitCode) {
        this.fromUnitCode = fromUnitCode;
    }

    public String getToUnitCode() {
        return toUnitCode;
    }

    public void setToUnitCode(String toUnitCode) {
        this.toUnitCode = toUnitCode;
    }

    public BigDecimal getRate() {
        return rate;
    }

    public void setRate(BigDecimal rate) {
        this.rate = rate;
    }

    public String getPhysicalFormCode() {
        return physicalFormCode;
    }

    public void setPhysicalFormCode(String physicalFormCode) {
        this.physicalFormCode = physicalFormCode;
    }
}
