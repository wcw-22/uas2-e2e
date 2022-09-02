'use strict';

/*** Generated spec file ***/
const OamadminportalAppLoginPage = require('../pageobjects/DeleteDDCourseMapping/OamadminportalAppLogin.page')
const OamadminportalAppContentSwitchrolePage = require('../pageobjects/DeleteDDCourseMapping/OamadminportalAppContentSwitchrole.page')
const OamadminportalAppContentDashboardPage = require('../pageobjects/DeleteDDCourseMapping/OamadminportalAppContentDashboard.page')
const IndexPage = require('../pageobjects/DeleteDDCourseMapping/Index.page')
const OamadminportalAppContentConfigurationManageDdpMappingSearchPage = require('../pageobjects/DeleteDDCourseMapping/OamadminportalAppContentConfigurationManageDdpMappingSearch.page')
const OamadminportalAppContentConfigurationManageDdpMappingSearch_01Page = require('../pageobjects/DeleteDDCourseMapping/OamadminportalAppContentConfigurationManageDdpMappingSearch_01.page')
const OamadminportalAppContentConfigurationManageDdpMappingSearch_02Page = require('../pageobjects/DeleteDDCourseMapping/OamadminportalAppContentConfigurationManageDdpMappingSearch_02.page')
const OamadminportalAppContentConfigurationManageDdpMappingSearch_03Page = require('../pageobjects/DeleteDDCourseMapping/OamadminportalAppContentConfigurationManageDdpMappingSearch_03.page')
const OamadminportalAppContentConfigurationManageDdpMappingViewTcb02_03Page = require('../pageobjects/DeleteDDCourseMapping/OamadminportalAppContentConfigurationManageDdpMappingViewTcb02_03.page')
const OamadminportalAppContentConfigurationManageDdpMappingViewTcb02_04Page = require('../pageobjects/DeleteDDCourseMapping/OamadminportalAppContentConfigurationManageDdpMappingViewTcb02_04.page')
const OamadminportalAppContentConfigurationManageDdpMappingNewPage = require('../pageobjects/DeleteDDCourseMapping/OamadminportalAppContentConfigurationManageDdpMappingNew.page')
const OamadminportalAppContentConfigurationManageDdpMappingSearch_04Page = require('../pageobjects/DeleteDDCourseMapping/OamadminportalAppContentConfigurationManageDdpMappingSearch_04.page')
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
  })

  it('should execute IndexPage', async () => {
    await (await IndexPage.menuddpmappingsearch_link).click() // click=6
  })

  it('should execute OamadminportalAppContentConfigurationManageDdpMappingSearchPage', async () => {
    await (await OamadminportalAppContentConfigurationManageDdpMappingSearchPage.doubleDegreeCourse_textInput).click() // click=7
    await (await OamadminportalAppContentConfigurationManageDdpMappingSearchPage.doubleDegreeCourse_textInput).setValueByKeys('TCB-Course02') // change=8
    await (await OamadminportalAppContentConfigurationManageDdpMappingSearchPage.nolabel_h3).click() // click=9
    await (await OamadminportalAppContentConfigurationManageDdpMappingSearchPage.search_app_message).click() // click=10
    await expect(await OamadminportalAppContentConfigurationManageDdpMappingSearchPage.tcbCourse02_p).toHaveTextContaining('TCB-Course02') // assertText=11
  })

  it('should execute OamadminportalAppContentConfigurationManageDdpMappingSearch_01Page', async () => {
    await expect(await OamadminportalAppContentConfigurationManageDdpMappingSearch_01Page.aLevel_p).toHaveTextContaining('A Level') // assertText=12
  })

  it('should execute OamadminportalAppContentConfigurationManageDdpMappingSearch_02Page', async () => {
    await expect(await OamadminportalAppContentConfigurationManageDdpMappingSearch_02Page.tcbCourse03TcbCourse04_p).toHaveTextContaining('TCB-Course03; TCB-Course04') // assertText=13
  })

  it('should execute OamadminportalAppContentConfigurationManageDdpMappingSearch_03Page', async () => {
    await (await OamadminportalAppContentConfigurationManageDdpMappingSearch_03Page.tcbCourse02_p).click() // click=14
  })

  it('should execute OamadminportalAppContentConfigurationManageDdpMappingViewTcb02_03Page', async () => {
    await expect(await OamadminportalAppContentConfigurationManageDdpMappingViewTcb02_03Page.nolabel_h3).toHaveTextContaining('Manage Double Degree Course Mapping- View') // assertText=15
    await expect(await OamadminportalAppContentConfigurationManageDdpMappingViewTcb02_03Page.aLevel_p).toHaveTextContaining('A Level') // assertText=16
    await expect(await OamadminportalAppContentConfigurationManageDdpMappingViewTcb02_03Page.tcbCourse02_p).toHaveTextContaining('TCB-Course02') // assertText=17
    await expect(await OamadminportalAppContentConfigurationManageDdpMappingViewTcb02_03Page.tcbCourse03_p).toHaveTextContaining('TCB-Course03') // assertText=18
    await expect(await OamadminportalAppContentConfigurationManageDdpMappingViewTcb02_03Page.tcbCourse04_p).toHaveTextContaining('TCB-Course04') // assertText=19
  })

  it('should execute OamadminportalAppContentConfigurationManageDdpMappingViewTcb02_04Page', async () => {
    await (await OamadminportalAppContentConfigurationManageDdpMappingViewTcb02_04Page.delete_app_message).click() // click=20
  })

  it('should execute OamadminportalAppContentConfigurationManageDdpMappingNewPage', async () => {
    await expect(await OamadminportalAppContentConfigurationManageDdpMappingNewPage.nolabel_app_message).toHaveTextContaining('Manage Double Degree Course Mapping- Delete Confirmation') // assertText=21
    await expect(await OamadminportalAppContentConfigurationManageDdpMappingNewPage.aLevel_p).toHaveTextContaining('A Level') // assertText=22
    await expect(await OamadminportalAppContentConfigurationManageDdpMappingNewPage.tcbCourse02_p).toHaveTextContaining('TCB-Course02') // assertText=23
    await expect(await OamadminportalAppContentConfigurationManageDdpMappingNewPage.tcbCourse03_p).toHaveTextContaining('TCB-Course03') // assertText=24
    await expect(await OamadminportalAppContentConfigurationManageDdpMappingNewPage.tcbCourse04_p).toHaveTextContaining('TCB-Course04') // assertText=25
    await expect(await OamadminportalAppContentConfigurationManageDdpMappingNewPage.doYouWantToProceed_app_message).toHaveTextContaining('Do you want to proceed?') // assertText=26
    await (await OamadminportalAppContentConfigurationManageDdpMappingNewPage.yes_app_message).click() // click=27
    await expect(await OamadminportalAppContentConfigurationManageDdpMappingNewPage.nolabel_li).toHaveTextContaining('Record(s) has been deleted successfully.') // assertText=28
    await (await OamadminportalAppContentConfigurationManageDdpMappingNewPage.eventidAck_button).click() // click=29
  })

  it('should execute OamadminportalAppContentConfigurationManageDdpMappingSearch_04Page', async () => {
    await expect(await OamadminportalAppContentConfigurationManageDdpMappingSearch_04Page.nolabel_h3).toHaveTextContaining('Manage Double Degree Course Mapping- Search') // assertText=30
  })
})
