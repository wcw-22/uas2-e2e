package sg.edu.nus.prs.domain.common;

import java.util.Objects;

public class ChemicalGrade {
    private String code;
    private String description;

    public ChemicalGrade() {}

    public ChemicalGrade(String code, String description) {
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
    
    public boolean isEmpty() {
		return this.code == null 
				&& this.description == null;
	}

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ChemicalGrade that = (ChemicalGrade) o;
        return Objects.equals(getCode(), that.getCode());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getCode());
    }
}
