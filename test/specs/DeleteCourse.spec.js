'use strict';

/*** Generated spec file ***/
const OamadminportalAppLoginPage = require('../pageobjects/DeleteCourse/OamadminportalAppLogin.page')
const OamadminportalAppContentSwitchrolePage = require('../pageobjects/DeleteCourse/OamadminportalAppContentSwitchrole.page')
const OamadminportalAppContentDashboardPage = require('../pageobjects/DeleteCourse/OamadminportalAppContentDashboard.page')
const OamadminportalAppContentConfigurationCourseSearchPage = require('../pageobjects/DeleteCourse/OamadminportalAppContentConfigurationCourseSearch.page')
const OamadminportalAppContentConfigurationCourseSearch_03Page = require('../pageobjects/DeleteCourse/OamadminportalAppContentConfigurationCourseSearch_03.page')
const OamadminportalAppContentConfigurationCourseSearch_04Page = require('../pageobjects/DeleteCourse/OamadminportalAppContentConfigurationCourseSearch_04.page')
const OamadminportalAppContentConfigurationCourseSearch_05Page = require('../pageobjects/DeleteCourse/OamadminportalAppContentConfigurationCourseSearch_05.page')
const OamadminportalAppContentConfigurationCourseSearch_06Page = require('../pageobjects/DeleteCourse/OamadminportalAppContentConfigurationCourseSearch_06.page')
const OamadminportalAppContentConfigurationCourseViewTcb01_05Page = require('../pageobjects/DeleteCourse/OamadminportalAppContentConfigurationCourseViewTcb01_05.page')
const OamadminportalAppContentConfigurationCourseNewPage = require('../pageobjects/DeleteCourse/OamadminportalAppContentConfigurationCourseNew.page')
const OamadminportalAppContentConfigurationCourseSearch_07Page = require('../pageobjects/DeleteCourse/OamadminportalAppContentConfigurationCourseSearch_07.page')
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
    await (await OamadminportalAppContentDashboardPage.menuconfiguration_link).click() // click=4
    await (await OamadminportalAppContentDashboardPage.menucourse_link).moveTo() // moveTo=5
    await (await OamadminportalAppContentDashboardPage.menucoursesearch_link).click() // click=6
  })

  it('should execute OamadminportalAppContentConfigurationCourseSearchPage', async () => {
    await (await OamadminportalAppContentConfigurationCourseSearchPage.courseCode_textInput).click() // click=7
    await (await OamadminportalAppContentConfigurationCourseSearchPage.courseCode_textInput).setValueByKeys('TCB01') // change=8
    await expect(await OamadminportalAppContentConfigurationCourseSearchPage.manageCourseSearch_h3).toHaveTextContaining('Manage Course - Search') // assertText=9
    await (await OamadminportalAppContentConfigurationCourseSearchPage.search_app_message).click() // click=10
    await expect(await OamadminportalAppContentConfigurationCourseSearchPage.tcb01_p).toHaveTextContaining('TCB01') // assertText=11
  })

  it('should execute OamadminportalAppContentConfigurationCourseSearch_03Page', async () => {
    await expect(await OamadminportalAppContentConfigurationCourseSearch_03Page.tcbCourse01_p).toHaveTextContaining('TCB-Course01') // assertText=12
  })

  it('should execute OamadminportalAppContentConfigurationCourseSearch_04Page', async () => {
    await expect(await OamadminportalAppContentConfigurationCourseSearch_04Page.singleDegreeProgram_p).toHaveTextContaining('SINGLE DEGREE PROGRAM') // assertText=13
  })

  it('should execute OamadminportalAppContentConfigurationCourseSearch_05Page', async () => {
    await expect(await OamadminportalAppContentConfigurationCourseSearch_05Page.yes_p).toHaveTextContaining('Yes') // assertText=14
  })

  it('should execute OamadminportalAppContentConfigurationCourseSearch_06Page', async () => {
    await expect(await OamadminportalAppContentConfigurationCourseSearch_06Page.active_p).toHaveTextContaining('Active') // assertText=15
    const TCB01_Button = await $('//p[(text() = "TCB01" or . = "TCB01")]')
    await TCB01_Button.click()
  })

  it('should execute OamadminportalAppContentConfigurationCourseViewTcb01_05Page', async () => {
    await expect(await OamadminportalAppContentConfigurationCourseViewTcb01_05Page.manageCourseView_h3).toHaveTextContaining('Manage Course - View') // assertText=16
    await expect(await OamadminportalAppContentConfigurationCourseViewTcb01_05Page.tcb01_p).toHaveTextContaining('TCB01') // assertText=17
    await expect(await OamadminportalAppContentConfigurationCourseViewTcb01_05Page.tcbCourse01_p).toHaveTextContaining('TCB-Course01') // assertText=18
    await expect(await OamadminportalAppContentConfigurationCourseViewTcb01_05Page._100SingleDegreeProgram_p).toHaveTextContaining('100 - SINGLE DEGREE PROGRAM') // assertText=19
    await expect(await OamadminportalAppContentConfigurationCourseViewTcb01_05Page.yes_p).toHaveTextContaining('Yes') // assertText=20
    await expect(await OamadminportalAppContentConfigurationCourseViewTcb01_05Page.yes_p).toHaveTextContaining('Yes') // assertText=21
    await (await OamadminportalAppContentConfigurationCourseViewTcb01_05Page.delete_app_message).click() // click=22
  })

  it('should execute OamadminportalAppContentConfigurationCourseNewPage', async () => {
    await expect(await OamadminportalAppContentConfigurationCourseNewPage.doYouWantToProceed_app_message).toHaveTextContaining('Do you want to proceed?') // assertText=23
    await expect(await OamadminportalAppContentConfigurationCourseNewPage.nolabel_app_message).toHaveTextContaining('Manage Course - Delete Confirmation') // assertText=24
    await (await OamadminportalAppContentConfigurationCourseNewPage.yes_app_message).click() // click=25
    await expect(await OamadminportalAppContentConfigurationCourseNewPage.nolabel_li).toHaveTextContaining('Record(s) has been deleted successfully.') // assertText=26
    await (await OamadminportalAppContentConfigurationCourseNewPage.ok_app_message).click() // click=27
  })

  it('should execute OamadminportalAppContentConfigurationCourseSearch_07Page', async () => {
    await expect(await OamadminportalAppContentConfigurationCourseSearch_07Page.manageCourseSearch_h3).toHaveTextContaining('Manage Course - Search') // assertText=28
  })
})
