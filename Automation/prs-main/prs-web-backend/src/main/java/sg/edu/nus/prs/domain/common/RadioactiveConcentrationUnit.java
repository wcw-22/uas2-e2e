package sg.edu.nus.prs.domain.common;

import java.util.Objects;

public class RadioactiveConcentrationUnit extends UnitMsr {
    public RadioactiveConcentrationUnit() {
        super();
    }

    public RadioactiveConcentrationUnit(String code, String description, String abbreviation) {
        super(code, description, abbreviation);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RadioactiveConcentrationUnit that = (RadioactiveConcentrationUnit) o;
        return Objects.equals(getCode(), that.getCode());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getCode());
    }
}
