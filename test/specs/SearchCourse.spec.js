'use strict';

/*** Generated spec file ***/
const OamadminportalAppLoginPage = require('../pageobjects/SearchCourse/OamadminportalAppLogin.page')
const OamadminportalAppContentSwitchrolePage = require('../pageobjects/SearchCourse/OamadminportalAppContentSwitchrole.page')
const OamadminportalAppContentDashboardPage = require('../pageobjects/SearchCourse/OamadminportalAppContentDashboard.page')
const OamadminportalAppContentConfigurationCourseSearchPage = require('../pageobjects/SearchCourse/OamadminportalAppContentConfigurationCourseSearch.page')
const OamadminportalAppContentConfigurationCourseViewTc8Page = require('../pageobjects/SearchCourse/OamadminportalAppContentConfigurationCourseViewTc8.page')
const OamadminportalAppContentConfigurationCourseSearch_01Page = require('../pageobjects/SearchCourse/OamadminportalAppContentConfigurationCourseSearch_01.page')
let dataVariables = {};

describe('University Admission System 2, Rule Engine and Mgmt', () => {
  it('should execute OamadminportalAppLoginPage', async () => {
    await OamadminportalAppLoginPage.open()

    await (await OamadminportalAppLoginPage.uas2ContentContainer_div).click() // click=0
    await (await OamadminportalAppLoginPage.loginas_textInput).click() // click=1
    await (await OamadminportalAppLoginPage.loginas_textInput).setValueByKeys('acts') // change=2
    await (await OamadminportalAppLoginPage.login_button).click() // click=3
  })

  it('should execute OamadminportalAppContentSwitchrolePage', async () => {
    await (await OamadminportalAppContentSwitchrolePage.nusAdministrator_button).click() // click=4
  })

  it('should execute OamadminportalAppContentDashboardPage', async () => {
    await (await OamadminportalAppContentDashboardPage.menuconfiguration_link).click() // click=5
    await (await OamadminportalAppContentDashboardPage.menucourse_link).moveTo() // click=6
    await (await OamadminportalAppContentDashboardPage.menucoursesearch_link).click() // click=7
  })

  it('should execute OamadminportalAppContentConfigurationCourseSearchPage', async () => {
    await expect(await OamadminportalAppContentConfigurationCourseSearchPage.manageCourseSearch_h3).toHaveTextContaining('Manage Course - Search') // assertText=8
    await (await OamadminportalAppContentConfigurationCourseSearchPage.courseCode_textInput).click() // click=9
    await (await OamadminportalAppContentConfigurationCourseSearchPage.courseCode_textInput).setValueByKeys('TC8') // change=10
    const TC8_Button = await $('//*/text()[normalize-space(.)="TC8"]/parent::*')
    await TC8_Button.click()
    await (await OamadminportalAppContentConfigurationCourseSearchPage.courseName_textInput).click() // click=11
    await (await OamadminportalAppContentConfigurationCourseSearchPage.courseName_textInput).click() // click=11
    await (await OamadminportalAppContentConfigurationCourseSearchPage.courseName_textInput).setValueByKeys('TC-Course8') // change=12
    await (await OamadminportalAppContentConfigurationCourseSearchPage.nolabel_div).click() // click=13
    await (await OamadminportalAppContentConfigurationCourseSearchPage.search_app_message).click() // click=14
    await (await OamadminportalAppContentConfigurationCourseSearchPage.tc8_p).click() // click=15
  })

  it('should execute OamadminportalAppContentConfigurationCourseViewTc8Page', async () => {
    await expect(await OamadminportalAppContentConfigurationCourseViewTc8Page.manageCourseView_h3).toHaveTextContaining('Manage Course - View') // assertText=16
    await expect(await OamadminportalAppContentConfigurationCourseViewTc8Page.tc8_p).toHaveTextContaining('TC8') // assertText=17
    await expect(await OamadminportalAppContentConfigurationCourseViewTc8Page.tcCourse8_p).toHaveTextContaining('TC-Course8') // assertText=18
    await expect(await OamadminportalAppContentConfigurationCourseViewTc8Page._100SingleDegreeProgram_p).toHaveTextContaining('100 - SINGLE DEGREE PROGRAM') // assertText=19
    await expect(await OamadminportalAppContentConfigurationCourseViewTc8Page.yes_p).toHaveTextContaining('Yes') // assertText=20
    await expect(await OamadminportalAppContentConfigurationCourseViewTc8Page.yes_p).toHaveTextContaining('Yes') // assertText=21
    await (await OamadminportalAppContentConfigurationCourseViewTc8Page.backToSearch_app_message).click() // click=22
  })

  it('should execute OamadminportalAppContentConfigurationCourseSearch_01Page', async () => {
    await expect(await OamadminportalAppContentConfigurationCourseSearch_01Page.manageCourseSearch_h3).toHaveTextContaining('Manage Course - Search') // assertText=23
  })
})
