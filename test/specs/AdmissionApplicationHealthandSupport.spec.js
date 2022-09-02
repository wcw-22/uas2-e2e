'use strict';

/*** Generated spec file ***/
const OamadminportalAppLoginPage = require('../pageobjects/AdmissionApplicationHealthandSupport/OamadminportalAppLogin.page')
const OamadminportalAppContentSwitchrolePage = require('../pageobjects/AdmissionApplicationHealthandSupport/OamadminportalAppContentSwitchrole.page')
const OamadminportalAppContentDashboardPage = require('../pageobjects/AdmissionApplicationHealthandSupport/OamadminportalAppContentDashboard.page')
const OamadminportalAppContentAdmissionAdmissionapplicationSearchPage = require('../pageobjects/AdmissionApplicationHealthandSupport/OamadminportalAppContentAdmissionAdmissionapplicationSearch.page')
const OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page = require('../pageobjects/AdmissionApplicationHealthandSupport/OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576.page')
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
    await (await OamadminportalAppContentAdmissionAdmissionapplicationSearchPage.search_app_message).click() // click=9
    await (await OamadminportalAppContentAdmissionAdmissionapplicationSearchPage.a33000576_p).click() // click=10
  })

  it('should execute OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page', async () => {
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.healthAndSupport_app_message).toHaveTextContaining('Health and Support') // assertText=11
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.anyHealthDeclaration_app_message).toHaveTextContaining('Any Health Declaration') // assertText=12
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.yes_div).toHaveTextContaining('Yes') // assertText=13
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.healthAndSupportCondition_app_message).toHaveTextContaining('Health and Support Condition') // assertText=14
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.chronicHepatitisB_div).toHaveTextContaining('Chronic Hepatitis B') // assertText=15
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.genetic_div).toHaveTextContaining('Genetic') // assertText=16
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.healthAndSupportCondition_app_message).toHaveTextContaining('Health and Support Condition') // assertText=17
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.diabetes_div).toHaveTextContaining('Diabetes') // assertText=18
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.genetic_div).toHaveTextContaining('Genetic') // assertText=19
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.healthAndSupportCondition_app_message).toHaveTextContaining('Health and Support Condition') // assertText=20
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.others_div).toHaveTextContaining('Others') // assertText=21
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.nolabel_div).toHaveTextContaining('Genetic irregularity in heart beat') // assertText=22
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.nolabel_app_message1).toHaveTextContaining('If you are taking any medication, please provide details of medication.') // assertText=23
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.medicationFromSpecialist_div).toHaveTextContaining('medication from Specialist') // assertText=24
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.nolabel_app_message2).toHaveTextContaining('If you have a drug or food allergy, please provide details of allergies and briefly describe your reaction.') // assertText=25
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.milkRashes_div).toHaveTextContaining('milk, rashes') // assertText=26
  })
})
