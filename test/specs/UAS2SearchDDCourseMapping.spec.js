'use strict';

/*** Generated spec file ***/
const OamadminportalAppLoginPage = require('../pageobjects/SearchDDCourseMapping/OamadminportalAppLogin.page')
const OamadminportalAppContentSwitchrolePage = require('../pageobjects/SearchDDCourseMapping/OamadminportalAppContentSwitchrole.page')
const OamadminportalAppContentDashboardPage = require('../pageobjects/SearchDDCourseMapping/OamadminportalAppContentDashboard.page')
const OamadminportalAppContentConfigurationManageDdpMappingSearch_01Page = require('../pageobjects/SearchDDCourseMapping/OamadminportalAppContentConfigurationManageDdpMappingSearch_01.page')
const OamadminportalAppContentConfigurationManageDdpMappingSearch_02Page = require('../pageobjects/SearchDDCourseMapping/OamadminportalAppContentConfigurationManageDdpMappingSearch_02.page')
const OamadminportalAppContentConfigurationManageDdpMappingSearch_03Page = require('../pageobjects/SearchDDCourseMapping/OamadminportalAppContentConfigurationManageDdpMappingSearch_03.page')
const WatchPage = require('../pageobjects/SearchDDCourseMapping/Watch.page')
const OamadminportalAppContentConfigurationManageDdpMappingViewTc9_03Page = require('../pageobjects/SearchDDCourseMapping/OamadminportalAppContentConfigurationManageDdpMappingViewTc9_03.page')
const OamadminportalAppContentConfigurationManageDdpMappingSearch_05Page = require('../pageobjects/SearchDDCourseMapping/OamadminportalAppContentConfigurationManageDdpMappingSearch_05.page')
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
    await (await OamadminportalAppContentDashboardPage.menuddpmappingsearch_link).click() // click=6
  })

  it('should execute OamadminportalAppContentConfigurationManageDdpMappingSearch_01Page', async () => {
    await expect(await OamadminportalAppContentConfigurationManageDdpMappingSearch_01Page.nolabel_h3).toHaveTextContaining('Manage Double Degree Course Mapping- Search') // assertText=7
    await (await OamadminportalAppContentConfigurationManageDdpMappingSearch_01Page.doubleDegreeCourse_textInput).click() // click=8
    await (await OamadminportalAppContentConfigurationManageDdpMappingSearch_01Page.doubleDegreeCourse_textInput).click() // click=9
    await (await OamadminportalAppContentConfigurationManageDdpMappingSearch_01Page.doubleDegreeCourse_textInput).setValueByKeys('TC-Course9') // change=10
    
    const TC9_Button = await $('//strong[(text() = "TC-Course9" or . = "TC-Course9")]')
    await TC9_Button.click()
    await (await OamadminportalAppContentConfigurationManageDdpMappingSearch_01Page.singleDegreeCourse_textInput).click() // click=11
    await (await OamadminportalAppContentConfigurationManageDdpMappingSearch_01Page.singleDegreeCourse_textInput).setValueByKeys('TC-Course10') // change=12
    await (await OamadminportalAppContentConfigurationManageDdpMappingSearch_01Page.applicationtype_select).selectByVisibleText('A Level') // change=13 - select
    await (await OamadminportalAppContentConfigurationManageDdpMappingSearch_01Page.search_app_message).click() // click=14
    await expect(await OamadminportalAppContentConfigurationManageDdpMappingSearch_01Page.tcCourse9_p).toHaveTextContaining('TC-Course9') // assertText=15
  })

  it('should execute OamadminportalAppContentConfigurationManageDdpMappingSearch_02Page', async () => {
    await expect(await OamadminportalAppContentConfigurationManageDdpMappingSearch_02Page.aLevel_p).toHaveTextContaining('A Level') // assertText=16
  })

  it('should execute OamadminportalAppContentConfigurationManageDdpMappingSearch_03Page', async () => {
    await expect(await OamadminportalAppContentConfigurationManageDdpMappingSearch_03Page.tcCourse10TcCourse11_p).toHaveTextContaining('TC-Course10; TC-Course11') // assertText=17
  })

  it('should execute WatchPage', async () => {
    await (await WatchPage.tcCourse9_p).click() // click=18
  })

  it('should execute OamadminportalAppContentConfigurationManageDdpMappingViewTc9_03Page', async () => {
    await expect(await OamadminportalAppContentConfigurationManageDdpMappingViewTc9_03Page.nolabel_h3).toHaveTextContaining('Manage Double Degree Course Mapping- View') // assertText=19
    await expect(await OamadminportalAppContentConfigurationManageDdpMappingViewTc9_03Page.aLevel_p).toHaveTextContaining('A Level') // assertText=20
    await expect(await OamadminportalAppContentConfigurationManageDdpMappingViewTc9_03Page.tcCourse9_p).toHaveTextContaining('TC-Course9') // assertText=21
    await expect(await OamadminportalAppContentConfigurationManageDdpMappingViewTc9_03Page.tcCourse10_p).toHaveTextContaining('TC-Course10') // assertText=22
    await expect(await OamadminportalAppContentConfigurationManageDdpMappingViewTc9_03Page.tcCourse11_p).toHaveTextContaining('TC-Course11') // assertText=23
    await (await OamadminportalAppContentConfigurationManageDdpMappingViewTc9_03Page.backToSearch_app_message).click() // click=24
  })

  it('should execute OamadminportalAppContentConfigurationManageDdpMappingSearch_05Page', async () => {
    await expect(await OamadminportalAppContentConfigurationManageDdpMappingSearch_05Page.nolabel_h3).toHaveTextContaining('Manage Double Degree Course Mapping- Search') // assertText=25
  })
})
