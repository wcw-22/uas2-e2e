// Imports
const chai = require('chai');
const assert = chai.assert;

// Page Objects
const loginPage = require('../../pageobjects/auth/loginPage');

describe('Mock Login (success)', () => {
    it('should open login page', async () => {
        await loginPage.open();
    })
    it('should submit login', async () => {
        await (await loginPage.login('ccegkw'));
    })
    it('should be either in dashboard or switch role page', async () => {
        let resultingUrl = await browser.getUrl();
        if (!resultingUrl.endsWith('/home') && !resultingUrl.endsWith('/switchRole')) {
            assert.fail('Login does not end in either dashboard or switch role page.');
        }
    })
});

describe('Mock Login (failure)', () => {
    it('should open login page', async () => {
        await loginPage.open();
    })
    it('should submit login', async () => {
        await (await loginPage.login('ccemksbh23'));
    })
    it('should be shown access denied', async () => {
        let resultingUrl = await browser.getUrl();
        if (!resultingUrl.endsWith('/accessDenied')) {
            assert.fail('Failed login does not end in access denied page.');
        }
    })
});