'use strict';

/*** Generated spec file ***/
const OamadminportalAppLoginPage = require('../pageobjects/LoginWithValidUserID/OamadminportalAppLogin.page')
const OamadminportalAppContentSwitchrolePage = require('../pageobjects/LoginWithValidUserID/OamadminportalAppContentSwitchrole.page')
const OamadminportalAppLoggedoutPage = require('../pageobjects/LoginWithValidUserID/OamadminportalAppLoggedout.page')
let dataVariables = {};

describe('University Admission System 2, Rule Engine and Mgmt', () => {
  it('should execute OamadminportalAppLoginPage', async () => {
    await OamadminportalAppLoginPage.open()

    await (await OamadminportalAppLoginPage.loginas_textInput).click() // click=0
    await (await OamadminportalAppLoginPage.loginas_textInput).setValueByKeys('acts') // change=1
    await (await OamadminportalAppLoginPage.login_button).click() // click=2
  })

  it('should execute OamadminportalAppContentSwitchrolePage', async () => {
    await expect(await OamadminportalAppContentSwitchrolePage.nolabel_h3).toHaveTextContaining('Welcome to the University Admission System 2') // assertText=3
    await (await OamadminportalAppContentSwitchrolePage.logoutfromswitchrolebutton_button).click() // click=4
  })

  it('should execute OamadminportalAppLoggedoutPage', async () => {
    await expect(await OamadminportalAppLoggedoutPage.nolabel_h3).toHaveTextContaining('Your session has been invalidated. Please login again to access this application.') // assertText=5
  })
})
