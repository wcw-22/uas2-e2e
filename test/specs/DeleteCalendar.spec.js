'use strict';

/*** Generated spec file ***/
const OamadminportalAppLoginPage = require('../pageobjects/DeleteCalendar/OamadminportalAppLogin.page')
const OamadminportalAppContentSwitchrolePage = require('../pageobjects/DeleteCalendar/OamadminportalAppContentSwitchrole.page')
const OamadminportalAppContentDashboardPage = require('../pageobjects/DeleteCalendar/OamadminportalAppContentDashboard.page')
const OamadminportalAppContentConfigurationManageCalendarSearchPage = require('../pageobjects/DeleteCalendar/OamadminportalAppContentConfigurationManageCalendarSearch.page')
const OamadminportalAppContentConfigurationManageCalendarSearch_01Page = require('../pageobjects/DeleteCalendar/OamadminportalAppContentConfigurationManageCalendarSearch_01.page')
const OamadminportalAppContentConfigurationManageCalendarSearch_02Page = require('../pageobjects/DeleteCalendar/OamadminportalAppContentConfigurationManageCalendarSearch_02.page')
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
    await (await OamadminportalAppContentDashboardPage.menucalendarsearch_link).click() // click=5
  })

  it('should execute OamadminportalAppContentConfigurationManageCalendarSearchPage', async () => {
    await (await OamadminportalAppContentConfigurationManageCalendarSearchPage.category_select).selectByVisibleText('Admission') // change=6 - select
    await (await OamadminportalAppContentConfigurationManageCalendarSearchPage.activity_select).selectByVisibleText('Admission Fee Payment') // change=7 - select
    await (await OamadminportalAppContentConfigurationManageCalendarSearchPage.search_app_message).click() // click=8
  })

  it('should execute OamadminportalAppContentConfigurationManageCalendarSearch_01Page', async () => {
    await (await OamadminportalAppContentConfigurationManageCalendarSearch_01Page.on_checkboxInput).click() // click=9
     const DelButton = await $('//app-message[(text() = "Delete" or . = "Delete")]')
     await DelButton.click()
     const confirmMsg1 = await $('//p[(text() = "Are you sure want to delete the selected calendar events?" or . = "Are you sure want to delete the selected calendar events?")]')
     await expect(confirmMsg1).toHaveText('Are you sure want to delete the selected calendar events?')
  })

  it('should execute OamadminportalAppContentConfigurationManageCalendarSearch_02Page', async () => {
    const YesButton = await $('//button[@type = "button" and (text() = "Yes" or . = "Yes")]')
     await YesButton.click()
     const confirmMsg2 = await $('//li[(text() = " Record(s) has been deleted successfully. " or . = " Record(s) has been deleted successfully. ")]')
     await expect(confirmMsg2).toHaveText('Record(s) has been deleted successfully.')
  })
})
