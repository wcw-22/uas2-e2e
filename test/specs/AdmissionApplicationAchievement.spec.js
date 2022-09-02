'use strict';

/*** Generated spec file ***/
const OamadminportalAppLoginPage = require('../pageobjects/AdmissionApplicationAchievement/OamadminportalAppLogin.page')
const OamadminportalAppContentSwitchrolePage = require('../pageobjects/AdmissionApplicationAchievement/OamadminportalAppContentSwitchrole.page')
const OamadminportalAppContentDashboardPage = require('../pageobjects/AdmissionApplicationAchievement/OamadminportalAppContentDashboard.page')
const OamadminportalAppContentAdmissionAdmissionapplicationSearchPage = require('../pageobjects/AdmissionApplicationAchievement/OamadminportalAppContentAdmissionAdmissionapplicationSearch.page')
const OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page = require('../pageobjects/AdmissionApplicationAchievement/OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576.page')
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
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.achievement_app_message).toHaveTextContaining('Achievement') // assertText=11
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.activity_app_message).toHaveTextContaining('Activity') // assertText=12
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.nolabel_div).toHaveTextContaining('Contribution in community or organisations') // assertText=13
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.level_app_message).toHaveTextContaining('Level') // assertText=14
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.notApplicable_div1).toHaveTextContaining('NOT APPLICABLE') // assertText=15
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.levelOfAchievement_app_message).toHaveTextContaining('Level of Achievement') // assertText=16
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.notApplicable_div2).toHaveTextContaining('Not Applicable') // assertText=17
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.positionHeld_app_message).toHaveTextContaining('Position Held') // assertText=18
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.member_div).toHaveTextContaining('MEMBER') // assertText=19
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.from_app_message).toHaveTextContaining('From') // assertText=20
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page._012018_div).toHaveTextContaining('01/2018') // assertText=21
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.to_app_message).toHaveTextContaining('To') // assertText=22
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page._122020_div).toHaveTextContaining('12/2020') // assertText=23
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.nolabel_app_message).toHaveTextContaining('Name of Activity / Organisation / Employer') // assertText=24
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.singaporeRedCross_div).toHaveTextContaining('Singapore Red Cross') // assertText=25
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.referenceName_app_message).toHaveTextContaining('Reference Name') // assertText=26
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.xavierLau_div).toHaveTextContaining('Xavier Lau') // assertText=27
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.position_app_message).toHaveTextContaining('Position') // assertText=28
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.manager_div).toHaveTextContaining('Manager') // assertText=29
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.email_app_message).toHaveTextContaining('Email') // assertText=30
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.hlTehYahooCom_div).toHaveTextContaining('hl.teh@yahoo.com') // assertText=31
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.telephone_app_message).toHaveTextContaining('Telephone') // assertText=32
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page._6533339999_div).toHaveTextContaining('6533339999') // assertText=33
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.personalStatement_app_message).toHaveTextContaining('Personal Statement') // assertText=34
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.creativeInnovative_div).toHaveTextContaining('Creative, Innovative') // assertText=35
  })
})
