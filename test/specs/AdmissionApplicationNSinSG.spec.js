'use strict';

/*** Generated spec file ***/
const OamadminportalAppLoginPage = require('../pageobjects/AdmissionApplicationNSinSG/OamadminportalAppLogin.page')
const OamadminportalAppContentSwitchrolePage = require('../pageobjects/AdmissionApplicationNSinSG/OamadminportalAppContentSwitchrole.page')
const OamadminportalAppContentDashboardPage = require('../pageobjects/AdmissionApplicationNSinSG/OamadminportalAppContentDashboard.page')
const OamadminportalAppContentAdmissionAdmissionapplicationSearchPage = require('../pageobjects/AdmissionApplicationNSinSG/OamadminportalAppContentAdmissionAdmissionapplicationSearch.page')
const OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page = require('../pageobjects/AdmissionApplicationNSinSG/OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576.page')
let dataVariables = {};

describe('University Admission System 2, Rule Engine and Mgmt', () => {
  it('should execute OamadminportalAppLoginPage', async () => {
    await OamadminportalAppLoginPage.open()

    await (await OamadminportalAppLoginPage.loginas_textInput).click() // click=0
    await (await OamadminportalAppLoginPage.loginas_textInput).setValueByKeys('acts') // change=1
    await (await OamadminportalAppLoginPage.login_button).click() // click=2
  })

  it('should execute OamadminportalAppContentSwitchrolePage', async () => {
    await (await OamadminportalAppContentSwitchrolePage.nusAdministrator_button).click() // click=3
  })

  it('should execute OamadminportalAppContentDashboardPage', async () => {
    await (await OamadminportalAppContentDashboardPage.menuadmission_link).click() // click=4
    await (await OamadminportalAppContentDashboardPage.menuadmissionaccess_link).moveTo() // moveTo=5
    await (await OamadminportalAppContentDashboardPage.menuadmissionapplicationsearch_link).click() // click=6
  })

  it('should execute OamadminportalAppContentAdmissionAdmissionapplicationSearchPage', async () => {
    await (await OamadminportalAppContentAdmissionAdmissionapplicationSearchPage.applicationNumber_textInput).click() // click=7
    await (await OamadminportalAppContentAdmissionAdmissionapplicationSearchPage.applicationNumber_textInput).setValueByKeys('33000576') // change=8
    await (await OamadminportalAppContentAdmissionAdmissionapplicationSearchPage.search_button).click() // click=9
    await (await OamadminportalAppContentAdmissionAdmissionapplicationSearchPage.a33000576_p).click() // click=10
  })

  it('should execute OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page', async () => {
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.nationalServiceInSingapore_app_message).toHaveTextContaining('National Service in Singapore') // assertText=11
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.serving_div).toHaveTextContaining('Serving') // assertText=12
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page._04012022_div).toHaveTextContaining('04/01/2022') // assertText=13
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page._02012024_div).toHaveTextContaining('02/01/2024') // assertText=14
  })
})
