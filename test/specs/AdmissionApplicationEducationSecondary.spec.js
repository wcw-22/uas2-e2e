'use strict';

/*** Generated spec file ***/
const OamadminportalAppLoginPage = require('../pageobjects/AdmissionApplicationEducationSecondary/OamadminportalAppLogin.page')
const OamadminportalAppContentSwitchrolePage = require('../pageobjects/AdmissionApplicationEducationSecondary/OamadminportalAppContentSwitchrole.page')
const OamadminportalAppContentDashboardPage = require('../pageobjects/AdmissionApplicationEducationSecondary/OamadminportalAppContentDashboard.page')
const OamadminportalAppContentAdmissionAdmissionapplicationSearchPage = require('../pageobjects/AdmissionApplicationEducationSecondary/OamadminportalAppContentAdmissionAdmissionapplicationSearch.page')
const OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page = require('../pageobjects/AdmissionApplicationEducationSecondary/OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576.page')
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
    await (await OamadminportalAppContentDashboardPage.applicationNumber_textInput).click() // click=7
  })

  it('should execute OamadminportalAppContentAdmissionAdmissionapplicationSearchPage', async () => {
    await (await OamadminportalAppContentAdmissionAdmissionapplicationSearchPage.applicationNumber_textInput).setValueByKeys('33000576') // change=8
    await (await OamadminportalAppContentAdmissionAdmissionapplicationSearchPage.search_app_message).click() // click=9
    await (await OamadminportalAppContentAdmissionAdmissionapplicationSearchPage.a33000576_p).click() // click=10
  })

  it('should execute OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page', async () => {
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.educationSecondary_app_message).toHaveTextContaining('Education - Secondary') // assertText=11
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.nolabel_app_message1).toHaveTextContaining('Have you completed Secondary 4 studies under the Integrated Programme (IP)?') // assertText=12
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.yes_div).toHaveTextContaining('Yes') // assertText=13
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.nolabel_app_message2).toHaveTextContaining('IP SUBJECTS RELEVANT FOR ADMISSIONS') // assertText=14
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.nameOfSecondarySchool_app_message).toHaveTextContaining('Name of Secondary School') // assertText=15
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.nolabel_div).toHaveTextContaining('Hwa Chong Junior College/ Hwa Chong Institution') // assertText=16
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.nolabel_td).toHaveTextContaining('Additional Mathematics & Equivalent') // assertText=17
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.a1_td).toHaveTextContaining('A1') // assertText=18
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.physicsEquivalent_td).toHaveTextContaining('Physics & Equivalent') // assertText=19
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.a1_td).toHaveTextContaining('A1') // assertText=20
  })
})
