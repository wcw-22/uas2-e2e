'use strict';

/*** Generated spec file ***/
const OamadminportalAppLoginPage = require('../pageobjects/NewDDCourseMapping/OamadminportalAppLogin.page')
const OamadminportalAppContentSwitchrolePage = require('../pageobjects/NewDDCourseMapping/OamadminportalAppContentSwitchrole.page')
const OamadminportalAppContentDashboardPage = require('../pageobjects/NewDDCourseMapping/OamadminportalAppContentDashboard.page')
const OamadminportalAppContentConfigurationManageDdpMappingNewPage = require('../pageobjects/NewDDCourseMapping/OamadminportalAppContentConfigurationManageDdpMappingNew.page')
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
    await (await OamadminportalAppContentDashboardPage.menuddpmapping_link).moveTo() // moveTo=5
    await (await OamadminportalAppContentDashboardPage.menuddpmappingnew_link).click() // click=6
  })

  it('should execute OamadminportalAppContentConfigurationManageDdpMappingNewPage', async () => {
    await (await OamadminportalAppContentConfigurationManageDdpMappingNewPage.applntypesTrigger_button).click() // click=7
    await (await OamadminportalAppContentConfigurationManageDdpMappingNewPage.aLevel_checkboxInput).click() // click=8
    await (await OamadminportalAppContentConfigurationManageDdpMappingNewPage.doubleDegreeCourse_select).selectByVisibleText('TCB-Course02') // change=9 - select
    await (await OamadminportalAppContentConfigurationManageDdpMappingNewPage.singleDegreeCourse1_select).selectByVisibleText('TCB-Course03') // change=10 - select
    await (await OamadminportalAppContentConfigurationManageDdpMappingNewPage.singleDegreeCourse2_select).selectByVisibleText('TCB-Course04') // change=11 - select
    await expect(await OamadminportalAppContentConfigurationManageDdpMappingNewPage.nolabel_app_message).toHaveTextContaining('Manage Double Degree Course Mapping- Add') // assertText=12
    await (await OamadminportalAppContentConfigurationManageDdpMappingNewPage.submit_app_message).click() // click=13
    await expect(await OamadminportalAppContentConfigurationManageDdpMappingNewPage.nolabel_app_message).toHaveTextContaining('Manage Double Degree Course Mapping- Add Confirmation') // assertText=14
    await expect(await OamadminportalAppContentConfigurationManageDdpMappingNewPage.aLevel_p).toHaveTextContaining('A Level') // assertText=15
    await expect(await OamadminportalAppContentConfigurationManageDdpMappingNewPage.tcbCourse02_p).toHaveTextContaining('TCB-Course02') // assertText=16
    await expect(await OamadminportalAppContentConfigurationManageDdpMappingNewPage.tcbCourse03_p).toHaveTextContaining('TCB-Course03') // assertText=17
    await expect(await OamadminportalAppContentConfigurationManageDdpMappingNewPage.tcbCourse04_p).toHaveTextContaining('TCB-Course04') // assertText=18
    await expect(await OamadminportalAppContentConfigurationManageDdpMappingNewPage.doYouWantToProceed_app_message).toHaveTextContaining('Do you want to proceed?') // assertText=19
    await (await OamadminportalAppContentConfigurationManageDdpMappingNewPage.yes_app_message).click() // click=20
    await expect(await OamadminportalAppContentConfigurationManageDdpMappingNewPage.nolabel_li).toHaveTextContaining('Record has been added successfully') // assertText=21
    await (await OamadminportalAppContentConfigurationManageDdpMappingNewPage.ok_app_message).click() // click=22
    await expect(await OamadminportalAppContentConfigurationManageDdpMappingNewPage.nolabel_app_message).toHaveTextContaining('Manage Double Degree Course Mapping- Add') // assertText=23
  })
})
