package sg.edu.nus.prs.domain.common;

import java.util.Objects;

public class ConcentrationUnit extends UnitMsr {
    public ConcentrationUnit() {
        super();
    }

    public ConcentrationUnit(String code, String description, String abbreviation) {
        super(code, description, abbreviation);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ConcentrationUnit that = (ConcentrationUnit) o;
        return Objects.equals(getCode(), that.getCode());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getCode());
    }
}
