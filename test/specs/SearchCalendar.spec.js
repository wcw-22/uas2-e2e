'use strict';

/*** Generated spec file ***/
const OamadminportalAppLoginPage = require('../pageobjects/SearchCalendar/OamadminportalAppLogin.page')
const OamadminportalAppContentSwitchrolePage = require('../pageobjects/SearchCalendar/OamadminportalAppContentSwitchrole.page')
const OamadminportalAppContentDashboardPage = require('../pageobjects/SearchCalendar/OamadminportalAppContentDashboard.page')
const OamadminportalAppContentConfigurationManageCalendarSearchPage = require('../pageobjects/SearchCalendar/OamadminportalAppContentConfigurationManageCalendarSearch.page')
const OamadminportalAppContentConfigurationManageCalendarSearch_01Page = require('../pageobjects/SearchCalendar/OamadminportalAppContentConfigurationManageCalendarSearch_01.page')
const OamadminportalAppContentConfigurationManageCalendarViewPage = require('../pageobjects/SearchCalendar/OamadminportalAppContentConfigurationManageCalendarView.page')
const OamadminportalAppContentConfigurationManageCalendarSearch_02Page = require('../pageobjects/SearchCalendar/OamadminportalAppContentConfigurationManageCalendarSearch_02.page')
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
    await (await OamadminportalAppContentDashboardPage.menucalendar_link).moveTo() // click=5
    await (await OamadminportalAppContentDashboardPage.menucalendarsearch_link).click() // click=7
  })

  it('should execute OamadminportalAppContentConfigurationManageCalendarSearchPage', async () => {
    await (await OamadminportalAppContentConfigurationManageCalendarSearchPage.academicYear_textInput).click() // click=8
    await (await OamadminportalAppContentConfigurationManageCalendarSearchPage.academicYear_textInput).setValueByKeys('2022') // change=9
    await (await OamadminportalAppContentConfigurationManageCalendarSearchPage.search_app_message).click() // click=10
  })

  it('should execute OamadminportalAppContentConfigurationManageCalendarSearch_01Page', async () => {
    await (await OamadminportalAppContentConfigurationManageCalendarSearch_01Page.aLevel_p).click() // click=11
  })

  it('should execute OamadminportalAppContentConfigurationManageCalendarViewPage', async () => {
    await (await OamadminportalAppContentConfigurationManageCalendarViewPage.backToSearch_button).click() // click=12
  })

  it('should execute OamadminportalAppContentConfigurationManageCalendarSearch_02Page', async () => {
    await (await OamadminportalAppContentConfigurationManageCalendarSearch_02Page.contentContainer_div).click() // click=13
  })
})
