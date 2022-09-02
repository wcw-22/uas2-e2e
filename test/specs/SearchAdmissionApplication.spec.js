'use strict';

/*** Generated spec file ***/
const OamadminportalAppLoginPage = require('../pageobjects/SearchAdmissionApplication/OamadminportalAppLogin.page')
const OamadminportalAppContentSwitchrolePage = require('../pageobjects/SearchAdmissionApplication/OamadminportalAppContentSwitchrole.page')
const OamadminportalAppContentDashboardPage = require('../pageobjects/SearchAdmissionApplication/OamadminportalAppContentDashboard.page')
const OamadminportalAppContentAdmissionAdmissionapplicationSearchPage = require('../pageobjects/SearchAdmissionApplication/OamadminportalAppContentAdmissionAdmissionapplicationSearch.page')
const OamadminportalAppContentAdmissionAdmissionapplicationSearch_01Page = require('../pageobjects/SearchAdmissionApplication/OamadminportalAppContentAdmissionAdmissionapplicationSearch_01.page')
const OamadminportalAppContentAdmissionAdmissionapplicationSearch_02Page = require('../pageobjects/SearchAdmissionApplication/OamadminportalAppContentAdmissionAdmissionapplicationSearch_02.page')
const OamadminportalAppContentAdmissionAdmissionapplicationSearch_03Page = require('../pageobjects/SearchAdmissionApplication/OamadminportalAppContentAdmissionAdmissionapplicationSearch_03.page')
const OamadminportalAppContentAdmissionAdmissionapplicationSearch_04Page = require('../pageobjects/SearchAdmissionApplication/OamadminportalAppContentAdmissionAdmissionapplicationSearch_04.page')
const OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576_04Page = require('../pageobjects/SearchAdmissionApplication/OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576_04.page')
const OamadminportalAppContentAdmissionAdmissionapplicationSearch_05Page = require('../pageobjects/SearchAdmissionApplication/OamadminportalAppContentAdmissionAdmissionapplicationSearch_05.page')
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
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationSearchPage.nolabel_h3).toHaveTextContaining('Manage Admission Application - Search') // assertText=9
    await (await OamadminportalAppContentAdmissionAdmissionapplicationSearchPage.search_app_message).click() // click=10
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationSearchPage.a33000576_p).toHaveTextContaining('A33000576') // assertText=11
  })

  it('should execute OamadminportalAppContentAdmissionAdmissionapplicationSearch_01Page', async () => {
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationSearch_01Page.zhiPingOng_p).toHaveTextContaining('ZHI PING ONG') // assertText=12
  })

  it('should execute OamadminportalAppContentAdmissionAdmissionapplicationSearch_02Page', async () => {
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationSearch_02Page.hlTehYahooCom_p).toHaveTextContaining('hl.teh@yahoo.com') // assertText=13
  })

  it('should execute OamadminportalAppContentAdmissionAdmissionapplicationSearch_03Page', async () => {
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationSearch_03Page.nolabel_p).toHaveTextContaining('A Level') // assertText=14
  })

  it('should execute OamadminportalAppContentAdmissionAdmissionapplicationSearch_04Page', async () => {
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationSearch_04Page._20232024_p).toHaveTextContaining('2023 / 2024') // assertText=15
  })

  it('should execute OamadminportalAppContentAdmissionAdmissionapplicationSearch_05Page', async () => {
    await (await OamadminportalAppContentAdmissionAdmissionapplicationSearch_05Page.a33000576_p).click() // click=16
  })
})
