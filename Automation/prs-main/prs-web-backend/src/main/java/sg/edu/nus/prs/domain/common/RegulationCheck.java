package sg.edu.nus.prs.domain.common;

import org.apache.commons.lang3.StringUtils;

public enum RegulationCheck {
    HAZARDOUS_SUBSTANCES_LICENCE            ("HAZARDOUS SUBSTANCES (LICENCE)",          null, false, false, true,  false),
    POISONS                                 ("POISONS",                                 null, false, false, true,  false),
    PETROLEUM_FLAMMABLE_MATERIALS           ("PETROLEUM FLAMMABLE MATERIALS",           null, true,  true,  true,  true),
    EXPLOSIVE_PRECURSORS                    ("EXPLOSIVE PRECURSORS",                    null, true,  true,  true,  true),
    CHEMICAL_WEAPONS_SCHEDULE_1             ("CHEMICAL WEAPONS",                        "1",  true,  true,  true,  true),
    CHEMICAL_WEAPONS_SCHEDULE_2             ("CHEMICAL WEAPONS",                        "2",  true,  true,  true,  true),
    CHEMICAL_WEAPONS_SCHEDULE_3             ("CHEMICAL WEAPONS",                        "3",  false, false, true,  false),
    MISUSE_OF_DRUGS_CONTROLLED_DRUGS        ("MISUSE OF DRUGS (CONTROLLED DRUGS)",      null, true,  true,  true,  true),
    MISUSE_OF_DRUGS_CONTROLLED_SUBSTANCES   ("MISUSE OF DRUGS (CONTROLLED SUBSTANCES)", null, false, false, true,  false),
    HAZARDOUS_SUBSTANCES_PERMIT             ("HAZARDOUS SUBSTANCES (PERMIT)",           null, true,  true,  true,  true),
    TEMPORARILY_LISTED_DRUGS                ("TEMPORARILY LISTED DRUGS",                null, true,  false, true,  false);

    private String description;
    private String schedule;
    private boolean requireROApprovalForLocal;
    private boolean requireLicenceCheckForLocal;
    private boolean requireROApprovalForOverseas;
    private boolean requireLicenceCheckForOverseas;

    RegulationCheck(String description, String schedule, boolean requireROApprovalForLocal, boolean requireLicenceCheckForLocal, boolean requireROApprovalForOverseas, boolean requireLicenceCheckForOverseas) {
        this.description = description;
        this.schedule = schedule;
        this.requireROApprovalForLocal = requireROApprovalForLocal;
        this.requireLicenceCheckForLocal = requireLicenceCheckForLocal;
        this.requireROApprovalForOverseas = requireROApprovalForOverseas;
        this.requireLicenceCheckForOverseas = requireLicenceCheckForOverseas;
    }

    public static RegulationCheck fromDescription(String description, String schedule) {
        for (RegulationCheck check: RegulationCheck.values()) {
            if (check.description.equals(description)) {
                if (check.schedule == null) {
                    return check;
                }

                if (StringUtils.equals(check.schedule, schedule)) {
                    return  check;
                }
            }
        }

        return null;
    }

    public String getDescription() {
        return description;
    }

    public String getSchedule() {
        return schedule;
    }

    public boolean isRequireROApprovalForLocal() {
        return requireROApprovalForLocal;
    }

    public boolean isRequireLicenceCheckForLocal() {
        return requireLicenceCheckForLocal;
    }

    public boolean isRequireROApprovalForOverseas() {
        return requireROApprovalForOverseas;
    }

    public boolean isRequireLicenceCheckForOverseas() {
        return requireLicenceCheckForOverseas;
    }
}
