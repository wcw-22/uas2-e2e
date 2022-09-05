package sg.edu.nus.prs.domain.common;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.math.BigDecimal;
import java.util.Objects;

import org.apache.commons.lang3.ObjectUtils;

public class NumericalValue {
    private NotationType notationType;
    private BigDecimal real;
    private Integer base;
    private BigDecimal exponent;
    private BigDecimal coefficient;

    public static NumericalValue RealValue(BigDecimal real) {
        NumericalValue nv = new NumericalValue();
        nv.setNotationType(NotationType.REAL_NUMBER_FORM);
        nv.setReal(real);

        return nv;
    }

    public static NumericalValue ScientificValue(Integer base, BigDecimal exponent, BigDecimal coefficient) {
        NumericalValue nv = new NumericalValue();
        nv.setNotationType(NotationType.SCIENTIFIC_FORM);
        nv.setBase(base);
        nv.setExponent(exponent);
        nv.setCoefficient(coefficient);

        return nv;
    }
    
    

    public NumericalValue() {
		super();
	}
    
    public NumericalValue(NumericalValue nv) {
		this.notationType = nv.notationType;
		this.real = nv.real;
		this.base = nv.base;
		this.exponent = nv.exponent;
		this.coefficient = nv.coefficient;
	}

	public NotationType getNotationType() {
        return notationType;
    }

    public void setNotationType(NotationType notationType) {
        this.notationType = notationType;
    }

    public BigDecimal getReal() {
        return real;
    }

    public void setReal(BigDecimal real) {
        this.real = real;
    }

    public Integer getBase() {
        return base;
    }

    public void setBase(Integer base) {
        this.base = base;
    }

    public BigDecimal getExponent() {
        return exponent;
    }

    public void setExponent(BigDecimal exponent) {
        this.exponent = exponent;
    }

    public BigDecimal getCoefficient() {
        return coefficient;
    }

    public void setCoefficient(BigDecimal coefficient) {
        this.coefficient = coefficient;
    }

    @JsonIgnore
    public boolean isEmpty() {
        return getReal() == null
            && getExponent() == null
            && getCoefficient() == null;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        
        NumericalValue that = (NumericalValue) o;
        
        if(NotationType.REAL_NUMBER_FORM == getNotationType()) {
        	return getNotationType() == that.getNotationType()
                    && ObjectUtils.compare(getReal(), that.getReal()) == 0;
        } else if(NotationType.SCIENTIFIC_FORM == getNotationType()) {
        	return getNotationType() == that.getNotationType()
                    && ObjectUtils.compare(getBase(), that.getBase()) == 0
                    && ObjectUtils.compare(getExponent(), that.getExponent()) == 0
                    && ObjectUtils.compare(getCoefficient(), that.getCoefficient()) == 0;
        } 
        
        return false;
        
    }

    @Override
    public int hashCode() {
        String rStr = "";
        if (getReal() != null) {
            rStr = getReal().stripTrailingZeros().toPlainString();
        }

        String eStr = "";
        if (getExponent() != null) {
            eStr = getExponent().stripTrailingZeros().toPlainString();
        }

        String cStr = "";
        if (getCoefficient() != null) {
            cStr = getCoefficient().stripTrailingZeros().toPlainString();
        }

    	 if(NotationType.REAL_NUMBER_FORM == getNotationType()) {
    		 return Objects.hash(getNotationType(), rStr);
    	 } else if(NotationType.SCIENTIFIC_FORM == getNotationType()){
    		 return Objects.hash(getNotationType(), getBase(), eStr, cStr);
    	 }
    	 
        return Objects.hash(getNotationType(), rStr, getBase(), eStr, cStr);
    }

	@Override
	public String toString() {
		return "NumericalValue "
				+ "[notationType=" + notationType + 
				", real=" + real + 
				", base=" + base + 
				", exponent=" + exponent + 
				", coefficient=" + coefficient + 
				"]";
	}
    
    
	public BigDecimal getRealValue() {
		if (notationType == NotationType.REAL_NUMBER_FORM) {
			return real;
		} 
		
		if(base != null 
                && exponent != null
                && coefficient != null) {
				
				return coefficient
						.multiply(BigDecimal.valueOf(
								Math.pow(base.doubleValue(), exponent.doubleValue())));
				
		}
		
		return null;
	}
}
