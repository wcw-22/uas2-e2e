'use strict';

/*** Generated spec file ***/
const OamadminportalAppLoginPage = require('../pageobjects/AdmissionApplicationDocumentUpload/OamadminportalAppLogin.page')
const OamadminportalAppContentSwitchrolePage = require('../pageobjects/AdmissionApplicationDocumentUpload/OamadminportalAppContentSwitchrole.page')
const OamadminportalAppContentDashboardPage = require('../pageobjects/AdmissionApplicationDocumentUpload/OamadminportalAppContentDashboard.page')
const OamadminportalAppContentAdmissionAdmissionapplicationSearchPage = require('../pageobjects/AdmissionApplicationDocumentUpload/OamadminportalAppContentAdmissionAdmissionapplicationSearch.page')
const OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page = require('../pageobjects/AdmissionApplicationDocumentUpload/OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576.page')
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
    await (await OamadminportalAppContentDashboardPage.menuadmissionaccess_link).moveTo() // click=5
    await (await OamadminportalAppContentDashboardPage.menuadmissionapplicationsearch_link).click() // click=6
  })

  it('should execute OamadminportalAppContentAdmissionAdmissionapplicationSearchPage', async () => {
    await (await OamadminportalAppContentAdmissionAdmissionapplicationSearchPage.applicationNumber_textInput).click() // click=7
    await (await OamadminportalAppContentAdmissionAdmissionapplicationSearchPage.applicationNumber_textInput).setValueByKeys('33000576') // change=8
    await (await OamadminportalAppContentAdmissionAdmissionapplicationSearchPage.search_app_message).click() // click=9
    await (await OamadminportalAppContentAdmissionAdmissionapplicationSearchPage.a33000576_p).click() // click=10
  })

  it('should execute OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page', async () => {
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.documentUpload_app_message).toHaveTextContaining('Document Upload') // assertText=11
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.requiredDocuments_app_message).toHaveTextContaining('Required Documents') // assertText=12
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.nricFrontAndBack_td).toHaveTextContaining('NRIC (front and back)') // assertText=13
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page._01TestNricPdf_link).toHaveTextContaining('01_Test_NRIC.pdf') // assertText=14
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.nolabel_td).toHaveTextContaining('Singapore-Cambridge GCE \'A\' Level results slip') // assertText=15
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page._05TestAlevelresultPdf_link).toHaveTextContaining('05_Test_ALevelResult.pdf') // assertText=16
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.medicalReport_td).toHaveTextContaining('Medical Report') // assertText=17
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page._23TestMedicalletterPdf_link).toHaveTextContaining('23_Test_MedicalLetter.pdf') // assertText=18
  })
})
