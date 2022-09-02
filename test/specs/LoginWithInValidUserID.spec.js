'use strict';

/*** Generated spec file ***/
const OamadminportalAppLoginPage = require('../pageobjects/LoginWithInValidUserID/OamadminportalAppLogin.page')
let dataVariables = {};

describe('University Admission System 2, Rule Engine and Mgmt', () => {
  it('should execute OamadminportalAppLoginPage', async () => {
    await OamadminportalAppLoginPage.open()

    await (await OamadminportalAppLoginPage.loginas_textInput).click() // click=0
    await (await OamadminportalAppLoginPage.loginas_textInput).setValueByKeys('test') // change=1
    await (await OamadminportalAppLoginPage.login_button).click() // click=2
    await expect(await OamadminportalAppLoginPage.accessDenied_h3).toHaveTextContaining('Access denied.') // assertText=3
  })
})
