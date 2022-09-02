'use strict';

/*** Generated spec file ***/
const OamadminportalAppLoginPage = require('../pageobjects/NewCalendar/OamadminportalAppLogin.page')
const OamadminportalAppContentSwitchrolePage = require('../pageobjects/NewCalendar/OamadminportalAppContentSwitchrole.page')
const OamadminportalAppContentDashboard_01Page = require('../pageobjects/NewCalendar/OamadminportalAppContentDashboard_01.page')
const OamadminportalAppContentConfigurationManageCalendarFormPage = require('../pageobjects/NewCalendar/OamadminportalAppContentConfigurationManageCalendarForm.page')
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

  it('should execute OamadminportalAppContentDashboard_01Page', async () => {
    await (await OamadminportalAppContentDashboard_01Page.menuconfiguration_link).click() // click=4
    await (await OamadminportalAppContentDashboard_01Page.menucalendar_link).moveTo() // click=5
    await (await OamadminportalAppContentDashboard_01Page.menucalendarnew_link).click() // click=5
  })

  it('should execute OamadminportalAppContentConfigurationManageCalendarFormPage', async () => {
    await (await OamadminportalAppContentConfigurationManageCalendarFormPage.category_select).selectByVisibleText('Admission') // change=6 - select
    await (await OamadminportalAppContentConfigurationManageCalendarFormPage.activity_select).selectByVisibleText('Admission Fee Payment') // change=7 - select
    await (await OamadminportalAppContentConfigurationManageCalendarFormPage.type_select).selectByVisibleText('A Level') // change=8 - select
    await (await OamadminportalAppContentConfigurationManageCalendarFormPage.academicYear_textInput).click() // click=9
    await (await OamadminportalAppContentConfigurationManageCalendarFormPage.academicYear_textInput).setValueByKeys('2022') // change=10
    //await (await OamadminportalAppContentConfigurationManageCalendarFormPage.startDate_textInput).click() // click=11
   // await (await OamadminportalAppContentConfigurationManageCalendarFormPage.endDate_textInput).click() // click=12
   // await (await OamadminportalAppContentConfigurationManageCalendarFormPage.startDate_textInput).click() // click=13
   await (await OamadminportalAppContentConfigurationManageCalendarFormPage.startDate_textInput).click()  
   const SelectDay = await $('//span[(text() = "25" or . = "25")]')
   await SelectDay.click()
     
    await (await OamadminportalAppContentConfigurationManageCalendarFormPage.startDate_textInput).setValueByKeys('25/08/2022 12:50') // change=15
    await (await OamadminportalAppContentConfigurationManageCalendarFormPage.endDate_textInput).click()  
    await (await OamadminportalAppContentConfigurationManageCalendarFormPage.endDate_textInput).click()  
    await (await OamadminportalAppContentConfigurationManageCalendarFormPage.endDate_textInput).setValueByKeys('26/08/2022 13:50') // change=15
    await (await OamadminportalAppContentConfigurationManageCalendarFormPage.submit_app_message).click() // click=16
   // await (await OamadminportalAppContentConfigurationManageCalendarFormPage.nolabel_li).click() // click=17s
    //await (await OamadminportalAppContentConfigurationManageCalendarFormPage.nolabel_li).click() // click=18
    //await (await OamadminportalAppContentConfigurationManageCalendarFormPage.nolabel_li).click() // click=19
    //await (await OamadminportalAppContentConfigurationManageCalendarFormPage.nolabel_div).click() // click=20
    //await (await OamadminportalAppContentConfigurationManageCalendarFormPage.activity_select).selectByVisibleText('Admission Fee Payment') // change=21 - select
    //await (await OamadminportalAppContentConfigurationManageCalendarFormPage.submit_button).click() // click=22
    //await (await OamadminportalAppContentConfigurationManageCalendarFormPage.startDate_textInput).click() // click=23
   // await (await OamadminportalAppContentConfigurationManageCalendarFormPage.startDate_textInput).setValueByKeys('23/08/2022 11:51') // change=24
    //await (await OamadminportalAppContentConfigurationManageCalendarFormPage.submit_app_message).click() // click=25
    //await (await OamadminportalAppContentConfigurationManageCalendarFormPage.doYouWantToProceed_app_message).click() // click=26
   // await (await OamadminportalAppContentConfigurationManageCalendarFormPage.doYouWantToProceed_app_message).click() // click=27
    const message1 = (await OamadminportalAppContentConfigurationManageCalendarFormPage.doYouWantToProceed_app_message) // click=28
    await expect(message1).toHaveText('Do you want to proceed?')
    //await (await OamadminportalAppContentConfigurationManageCalendarFormPage.doYouWantToProceed_app_message).click() // click=29
    await (await OamadminportalAppContentConfigurationManageCalendarFormPage.yes_app_message).click() // click=30
    //await (await OamadminportalAppContentConfigurationManageCalendarFormPage.nolabel_li).click() // click=31
   // await (await OamadminportalAppContentConfigurationManageCalendarFormPage.nolabel_li).click() // click=32
    //await (await OamadminportalAppContentConfigurationManageCalendarFormPage.nolabel_li).click() // click=33
    await (await OamadminportalAppContentConfigurationManageCalendarFormPage.ok_app_message).click() // click=34
  })
})
