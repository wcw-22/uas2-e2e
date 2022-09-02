'use strict';

/*** Generated spec file ***/
const OamadminportalAppLoginPage = require('../pageobjects/AdmissionApplicationEducationOthers/OamadminportalAppLogin.page')
const OamadminportalAppContentSwitchrolePage = require('../pageobjects/AdmissionApplicationEducationOthers/OamadminportalAppContentSwitchrole.page')
const OamadminportalAppContentDashboardPage = require('../pageobjects/AdmissionApplicationEducationOthers/OamadminportalAppContentDashboard.page')
const OamadminportalAppContentAdmissionAdmissionapplicationSearchPage = require('../pageobjects/AdmissionApplicationEducationOthers/OamadminportalAppContentAdmissionAdmissionapplicationSearch.page')
const OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page = require('../pageobjects/AdmissionApplicationEducationOthers/OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576.page')
const OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576_01Page = require('../pageobjects/AdmissionApplicationEducationOthers/OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576_01.page')
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
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.educationOthers_app_message).toHaveTextContaining('Education - Others') // assertText=11
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.sat_app_message).toHaveTextContaining('SAT') // assertText=12
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page._012022_div).toHaveTextContaining('01/2022') // assertText=13
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.nolabel_app_message).toHaveTextContaining('Evidence-Based Reading and Writing') // assertText=14
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page._750_td).toHaveTextContaining('750') // assertText=15
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.mathematics_app_message).toHaveTextContaining('Mathematics') // assertText=16
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page._700_td).toHaveTextContaining('700') // assertText=17
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.satEssay_app_message).toHaveTextContaining('SAT Essay') // assertText=18
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.essayAnalysis_app_message).toHaveTextContaining('Essay Analysis') // assertText=19
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page._7_td).toHaveTextContaining('7') // assertText=20
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.essayReading_app_message).toHaveTextContaining('Essay Reading') // assertText=21
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page._8_td).toHaveTextContaining('8') // assertText=22
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.essayWriting_app_message).toHaveTextContaining('Essay Writing') // assertText=23
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page._8_td).toHaveTextContaining('8') // assertText=24
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.satSubjects_app_message).toHaveTextContaining('SAT Subjects') // assertText=25
    //await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.nolabel_div).toHaveTextContaining('assertText') // assertText=26
    const nolabel_div1 = await(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.nolabel_div).getText()
    expect(nolabel_div1).toEqual('')
    await (await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.nolabel_div).click() // click=27
  })

  it('should execute OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576_01Page', async () => {
    await (await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576_01Page.nolabel_i).click() // click=28
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576_01Page.noRecordsFound_app_message).toHaveTextContaining('No records found') // assertText=29
    await (await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576_01Page.cancel_app_message).click() // click=30
  })
})
