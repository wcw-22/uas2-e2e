// Imports
const chai = require('chai');
const assert = chai.assert;

const util = require('../../common/utils');

// Page Objects
const loginPage = require('../../pageobjects/auth/loginPage');
const switchRolePage = require('../../pageobjects/auth/switchRolePage');
const headerSection = require('../../pageobjects/common/headerSection');

describe('Switch Role (success)', () => {
    it('should open login page', async () => {
        await loginPage.open()
    })
    it('should submit login', async () => {
        await (await loginPage.login('ccemksbh'));
    })
    it('should select role', async () => {
        await util.waitForUrlEnding(browser, '/switchRole', 1000);

        let resultingUrl = await browser.getUrl();
        if (!resultingUrl.endsWith('/switchRole')) {
            assert.fail('Login does not end in switch role page.');
        }

        let roles = await switchRolePage.getAvailableRoles();
        assert.isNotEmpty(roles, 'has at least 1 role.');

        let ableToSwitchRole = await switchRolePage.switchRole(roles[0]);
        if (!ableToSwitchRole) {
            assert.fail('Switch role failed: ' + roles[0]);
        }
    })
    it('should be in dashboard', async () => {
        await util.waitForUrlEnding(browser, '/home', 1000);

        let resultingUrl = await browser.getUrl();
        if (!resultingUrl.endsWith('/home')) {
            assert.fail('Selecting role does not end in dashboard: ' + resultingUrl);
        }
    })
});

describe('Switch Role (after login)', () => {
    it('should open login page', async () => {
        await loginPage.open()
    })
    it('should submit login', async () => {
        await (await loginPage.login('ccemksbh'));
    })
    it('should have at least 2 roles', async () => {
        await util.waitForUrlEnding(browser, '/switchRole', 1000);

        let resultingUrl = await browser.getUrl();
        if (!resultingUrl.endsWith('/switchRole')) {
            assert.fail('Login does not end in switch role page.');
        }

        let roles = await switchRolePage.getAvailableRoles();
        assert.isTrue(roles.length >= 2, 'has at least 2 roles.');
    })
    it('should select role', async () => {
        let roles = await switchRolePage.getAvailableRoles();
        let ableToSwitchRole = await switchRolePage.switchRole(roles[0]);
        if (!ableToSwitchRole) {
            assert.fail('Switch role failed: ' + roles[0]);
        }

        let currentRole = await headerSection.getCurrentRole();
        assert.equal(currentRole, roles[0], 'Role as expected.');
    })
    it('should be in dashboard', async () => {
        await util.waitForUrlEnding(browser, '/home', 1000);

        let resultingUrl = await browser.getUrl();
        if (!resultingUrl.endsWith('/home')) {
            assert.fail('Selecting role does not end in dashboard.');
        }
    })
    it('should click on switch role', async () => {
        await switchRolePage.open();

        await util.waitForUrlEnding(browser, '/switchRole', 1000);

        let resultingUrl = await browser.getUrl();
        if (!resultingUrl.endsWith('/switchRole')) {
            assert.fail('Does not end in switch role page.');
        }
    })
    it('should select role again', async () => {
        let roles = await switchRolePage.getAvailableRoles();
        let ableToSwitchRole = await switchRolePage.switchRole(roles[1]);
        if (!ableToSwitchRole) {
            assert.fail('Switch role failed: ' + roles[1]);
        }

        let currentRole = await headerSection.getCurrentRole();
        assert.equal(currentRole, roles[1], 'Role as expected.');
    })
    it('should be in dashboard again', async () => {
        await util.waitForUrlEnding(browser, '/home', 1000);

        let resultingUrl = await browser.getUrl();
        if (!resultingUrl.endsWith('/home')) {
            assert.fail('Selecting role does not end in dashboard.');
        }
    })
});