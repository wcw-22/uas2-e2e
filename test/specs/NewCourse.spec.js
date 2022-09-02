'use strict';

/*** Generated spec file ***/
const OamadminportalAppLoginPage = require('../pageobjects/NewCourse/OamadminportalAppLogin.page')
const OamadminportalAppContentSwitchrolePage = require('../pageobjects/NewCourse/OamadminportalAppContentSwitchrole.page')
const OamadminportalAppContentDashboardPage = require('../pageobjects/NewCourse/OamadminportalAppContentDashboard.page')
const OamadminportalAppContentConfigurationCourseNewPage = require('../pageobjects/NewCourse/OamadminportalAppContentConfigurationCourseNew.page')
const OamadminportalAppContentConfigurationCourseNew_01Page = require('../pageobjects/NewCourse/OamadminportalAppContentConfigurationCourseNew_01.page')
const OamadminportalAppContentConfigurationCourseNew_02Page = require('../pageobjects/NewCourse/OamadminportalAppContentConfigurationCourseNew_02.page')
let dataVariables = {};

describe('University Admission System 2, Rule Engine and Mgmt', () => {
  it('should execute OamadminportalAppLoginPage', async () => {
    await OamadminportalAppLoginPage.open()
    await (await OamadminportalAppLoginPage.loginas_textInput).click() // click=1
    await (await OamadminportalAppLoginPage.loginas_textInput).setValueByKeys('acts') // change=0
    await (await OamadminportalAppLoginPage.login_button).click() // click=1
  })

  it('should execute OamadminportalAppContentSwitchrolePage', async () => {
    await (await OamadminportalAppContentSwitchrolePage.nusAdministrator_button).click() // click=2
  })

  it('should execute OamadminportalAppContentDashboardPage', async () => {
    await (await OamadminportalAppContentDashboardPage.menuconfiguration_link).click() // click=3
    await (await OamadminportalAppContentDashboardPage.menucourse_link).moveTo() // moveTo=4
    await (await OamadminportalAppContentDashboardPage.menucoursenew_link).click() // click=5
  })

  it('should execute OamadminportalAppContentConfigurationCourseNewPage', async () => {
    await (await OamadminportalAppContentConfigurationCourseNewPage.courseCode_textInput).click() // click=6
    await (await OamadminportalAppContentConfigurationCourseNewPage.courseCode_textInput).setValueByKeys('TCB01') // change=7
    await (await OamadminportalAppContentConfigurationCourseNewPage.courseName_textInput).click() // click=8
    await (await OamadminportalAppContentConfigurationCourseNewPage.courseName_textInput).setValueByKeys('TCB-Course01') // change=9
    await (await OamadminportalAppContentConfigurationCourseNewPage.courseType_select).selectByVisibleText('100 - SINGLE DEGREE PROGRAM') // change=10 - select
    await (await OamadminportalAppContentConfigurationCourseNewPage.yes_radioInput).click() // click=11
    await (await OamadminportalAppContentConfigurationCourseNewPage.yes_radioInput).click() // change=12 - radioInput
  })

  it('should execute OamadminportalAppContentConfigurationCourseNew_01Page', async () => {
    await (await OamadminportalAppContentConfigurationCourseNew_01Page.submit_app_message).click() // click=13
    await expect(await OamadminportalAppContentConfigurationCourseNew_01Page.doYouWantToProceed_app_message).toHaveTextContaining('Do you want to proceed?') // assertText=14
    await expect(await OamadminportalAppContentConfigurationCourseNew_01Page.manageCourseAdd_app_message).toHaveTextContaining('Manage Course - Add Confirmation') // assertText=15
    await expect(await OamadminportalAppContentConfigurationCourseNew_01Page.tcb01_p).toHaveTextContaining('TCB01') // assertText=16
    await expect(await OamadminportalAppContentConfigurationCourseNew_01Page.tcbCourse01_p).toHaveTextContaining('TCB-Course01') // assertText=17
    await expect(await OamadminportalAppContentConfigurationCourseNew_01Page._100SingleDegreeProgram_p).toHaveTextContaining('100 - SINGLE DEGREE PROGRAM') // assertText=18
  })

  it('should execute OamadminportalAppContentConfigurationCourseNew_02Page', async () => {
    await expect(await OamadminportalAppContentConfigurationCourseNew_02Page.yes_p).toHaveTextContaining('Yes') // assertText=19
    await (await OamadminportalAppContentConfigurationCourseNew_02Page.yes_app_message).click() // click=20
    await expect(await OamadminportalAppContentConfigurationCourseNew_02Page.nolabel_li).toHaveTextContaining('Record has been added successfully') // assertText=21
    await (await OamadminportalAppContentConfigurationCourseNew_02Page.eventidAck_button).click() // click=22
  })
})
