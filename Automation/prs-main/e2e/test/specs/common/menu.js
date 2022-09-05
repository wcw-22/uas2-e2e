// Imports
const chai = require('chai');
const assert = chai.assert;

const util = require('../../common/utils');
const roles = require('../../common/roles');

// Page Objects
const loginPage = require('../../pageobjects/auth/loginPage');
const switchRolePage = require('../../pageobjects/auth/switchRolePage');
const headerSection = require('../../pageobjects/common/headerSection');
const menuSection = require('../../pageobjects/common/menuSection');

const RoleToUserId = {
    ROLE_NUS_ADMIN:                 "MEWYUEN",
    ROLE_FAC_ADMIN:                 "MEWYUEN",
    ROLE_DEPT_ADMIN:                "MEWYUEN",
    ROLE_DEAN:                      "SCIDEAN",
    ROLE_HEAD_OF_DEPARTMENT:        "CHMHEAD",
    ROLE_REGULATORY:                "MEWYUEN",
    ROLE_QUOTATION_APPV_AUTH:       "MEWYUEN",
    ROLE_GOODS_RECEIPT:             "CCELHTJ",
    ROLE_PRINCIPAL_INVESTIGATOR:    "MEWYUEN",
    ROLE_RESEARCHER:                "MEWYUEN",
    ROLE_LAB_ADMIN:                 "CHMJA",
    ROLE_LABORATORY_SUPPLY:         "MEWYUEN",
    ROLE_VICE_PRESIDENT:            "YNCTANTY",
    ROLE_CATALOGUE_ADMIN:           "MEWYUEN",
    ROLE_VIEWER:                    "MEWYUEN"
}

const UserIdHasSwitchRole = {
    "MEWYUEN": true,
    "SCIDEAN": false,
    "CHMHEAD": true,
    "YNCTANTY": false,
    "CHMJA": false
}

const menuCheckScenario = async (role, userId, allowed, menuItem) => {
    await loginPage.open();
    await (await loginPage.login(userId));

    if (UserIdHasSwitchRole[userId]) {
        await util.waitForUrlEnding(browser, '/switchRole', 1000);

        const ableToSwitchRole = await switchRolePage.switchRole(role);
        assert.isTrue(ableToSwitchRole, 'Able to switch to role: ' + role);
    }

    let currentRole = await headerSection.getCurrentRole();
    assert.equal(currentRole, role, 'Role as expected.');

    const topLevelMenuItems = await menuSection.getTopLevelMenuItems();

    const hasConfiguration = !!topLevelMenuItems.find(
        mi => mi === menuItem
    );

    if (allowed) {
        assert.isTrue(hasConfiguration, role + ': Able to see "' + menuItem + '"');
    } else {
        assert.isFalse(hasConfiguration, role + ': NOT able to see "' + menuItem + '"');
    }
}

describe('Only administrators can see "Configuration" menu item.', () => {
    const allowedRoles = {};
    for (let role of roles.AdministratorRoles) {
        allowedRoles[role] = true;
    }

    const runScenario = async (role, userId, allowed) => {
        await menuCheckScenario(role, userId, allowed, "Configuration");
    }

    it('NUS Administrator can see "Configuration"', async () => {
        const role = "ROLE_NUS_ADMIN";
        await runScenario(roles.Roles[role], RoleToUserId[role], allowedRoles[role]);
    })

    it('Faculty Administrator can see "Configuration"', async () => {
        const role = "ROLE_FAC_ADMIN";
        await runScenario(roles.Roles[role], RoleToUserId[role], allowedRoles[role]);
    })

    it('Department Administrator can see "Configuration"', async () => {
        const role = "ROLE_DEPT_ADMIN";
        await runScenario(roles.Roles[role], RoleToUserId[role], allowedRoles[role]);
    })

    it('Dean cannot see "Configuration"', async () => {
        const role = "ROLE_DEAN";
        await runScenario(roles.Roles[role], RoleToUserId[role], allowedRoles[role]);
    })

    it('Head of Department cannot see "Configuration"', async () => {
        const role = "ROLE_HEAD_OF_DEPARTMENT";
        await runScenario(roles.Roles[role], RoleToUserId[role], allowedRoles[role]);
    })

    it('Regulatory Officer cannot see "Configuration"', async () => {
        const role = "ROLE_REGULATORY";
        await runScenario(roles.Roles[role], RoleToUserId[role], allowedRoles[role]);
    })

    it('Quotation Approving Authority cannot see "Configuration"', async () => {
        const role = "ROLE_QUOTATION_APPV_AUTH";
        await runScenario(roles.Roles[role], RoleToUserId[role], allowedRoles[role]);
    })

    it('Goods Receipt Officer cannot see "Configuration"', async () => {
        const role = "ROLE_GOODS_RECEIPT";
        await runScenario(roles.Roles[role], RoleToUserId[role], allowedRoles[role]);
    })

    it('Principal Investigator cannot see "Configuration"', async () => {
        const role = "ROLE_PRINCIPAL_INVESTIGATOR";
        await runScenario(roles.Roles[role], RoleToUserId[role], allowedRoles[role]);
    })

    it('Researcher cannot see "Configuration"', async () => {
        const role = "ROLE_RESEARCHER";
        await runScenario(roles.Roles[role], RoleToUserId[role], allowedRoles[role]);
    })

    it('Laboratory Administrator cannot see "Configuration"', async () => {
        const role = "ROLE_LAB_ADMIN";
        await runScenario(roles.Roles[role], RoleToUserId[role], allowedRoles[role]);
    })

    it('Laboratory Supply Officer cannot see "Configuration"', async () => {
        const role = "ROLE_LABORATORY_SUPPLY";
        await runScenario(roles.Roles[role], RoleToUserId[role], allowedRoles[role]);
    })

    it('Vice President cannot see "Configuration"', async () => {
        const role = "ROLE_VICE_PRESIDENT";
        await runScenario(roles.Roles[role], RoleToUserId[role], allowedRoles[role]);
    })

    it('Catalogue Administrator can see "Configuration"', async () => {
        const role = "ROLE_CATALOGUE_ADMIN";
        await runScenario(roles.Roles[role], RoleToUserId[role], allowedRoles[role]);
    })

    it('Viewer cannot see "Configuration"', async () => {
        const role = "ROLE_VIEWER";
        await runScenario(roles.Roles[role], RoleToUserId[role], allowedRoles[role]);
    })
});

describe('Only PI, Researcher or Lab Admin can see "New Request" menu item.', () => {
    const allowedRoles = {};
    for (let role of roles.PurchaseRoles) {
        allowedRoles[role] = true;
    }

    const runScenario = async (role, userId, allowed) => {
        await menuCheckScenario(role, userId, allowed, "New Request");
    }

    it('NUS Administrator cannot see "New Request"', async () => {
        const role = "ROLE_NUS_ADMIN";
        await runScenario(roles.Roles[role], RoleToUserId[role], allowedRoles[role]);
    })

    it('Faculty Administrator cannot see "New Request"', async () => {
        const role = "ROLE_FAC_ADMIN";
        await runScenario(roles.Roles[role], RoleToUserId[role], allowedRoles[role]);
    })

    it('Department Administrator cannot see "New Request"', async () => {
        const role = "ROLE_DEPT_ADMIN";
        await runScenario(roles.Roles[role], RoleToUserId[role], allowedRoles[role]);
    })

    it('Dean cannot see "New Request"', async () => {
        const role = "ROLE_DEAN";
        await runScenario(roles.Roles[role], RoleToUserId[role], allowedRoles[role]);
    })

    it('Head of Department cannot see "New Request"', async () => {
        const role = "ROLE_HEAD_OF_DEPARTMENT";
        await runScenario(roles.Roles[role], RoleToUserId[role], allowedRoles[role]);
    })

    it('Regulatory Officer cannot see "New Request"', async () => {
        const role = "ROLE_REGULATORY";
        await runScenario(roles.Roles[role], RoleToUserId[role], allowedRoles[role]);
    })

    it('Quotation Approving Authority cannot see "New Request"', async () => {
        const role = "ROLE_QUOTATION_APPV_AUTH";
        await runScenario(roles.Roles[role], RoleToUserId[role], allowedRoles[role]);
    })

    it('Goods Receipt Officer cannot see "New Request"', async () => {
        const role = "ROLE_GOODS_RECEIPT";
        await runScenario(roles.Roles[role], RoleToUserId[role], allowedRoles[role]);
    })

    it('Principal Investigator can see "New Request"', async () => {
        const role = "ROLE_PRINCIPAL_INVESTIGATOR";
        await runScenario(roles.Roles[role], RoleToUserId[role], allowedRoles[role]);
    })

    it('Researcher can see "New Request"', async () => {
        const role = "ROLE_RESEARCHER";
        await runScenario(roles.Roles[role], RoleToUserId[role], allowedRoles[role]);
    })

    it('Laboratory Administrator can see "New Request"', async () => {
        const role = "ROLE_LAB_ADMIN";
        await runScenario(roles.Roles[role], RoleToUserId[role], allowedRoles[role]);
    })

    it('Laboratory Supply Officer cannot see "New Request"', async () => {
        const role = "ROLE_LABORATORY_SUPPLY";
        await runScenario(roles.Roles[role], RoleToUserId[role], allowedRoles[role]);
    })

    it('Vice President cannot see "New Request"', async () => {
        const role = "ROLE_VICE_PRESIDENT";
        await runScenario(roles.Roles[role], RoleToUserId[role], allowedRoles[role]);
    })

    it('Catalogue Administrator cannot see "New Request"', async () => {
        const role = "ROLE_CATALOGUE_ADMIN";
        await runScenario(roles.Roles[role], RoleToUserId[role], allowedRoles[role]);
    })

    it('Viewer cannot see "New Request"', async () => {
        const role = "ROLE_VIEWER";
        await runScenario(roles.Roles[role], RoleToUserId[role], allowedRoles[role]);
    })
});