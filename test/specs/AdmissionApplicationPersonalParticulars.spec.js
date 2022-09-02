'use strict';

/*** Generated spec file ***/
const OamadminportalAppLoginPage = require('../pageobjects/AdmissionApplicationPersonalParticulars/OamadminportalAppLogin.page')
const OamadminportalAppContentSwitchrolePage = require('../pageobjects/AdmissionApplicationPersonalParticulars/OamadminportalAppContentSwitchrole.page')
const OamadminportalAppContentDashboardPage = require('../pageobjects/AdmissionApplicationPersonalParticulars/OamadminportalAppContentDashboard.page')
const OamadminportalAppContentAdmissionAdmissionapplicationSearchPage = require('../pageobjects/AdmissionApplicationPersonalParticulars/OamadminportalAppContentAdmissionAdmissionapplicationSearch.page')
const OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page = require('../pageobjects/AdmissionApplicationPersonalParticulars/OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576.page')
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
    await (await OamadminportalAppContentAdmissionAdmissionapplicationSearchPage.applicationNumber_textInput).click()
    await (await OamadminportalAppContentAdmissionAdmissionapplicationSearchPage.applicationNumber_textInput).setValueByKeys('33000576') // change=7
    await (await OamadminportalAppContentAdmissionAdmissionapplicationSearchPage.search_app_message).click() // click=8
    await (await OamadminportalAppContentAdmissionAdmissionapplicationSearchPage.a33000576_p).click() // click=9
  })

  it('should execute OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page', async () => {
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.nolabel_p).toHaveTextContaining('Singapore-Cambridge GCE \'A\' Level') // assertText=10
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page._24082022_p).toHaveTextContaining('24/08/2022') // assertText=11
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.a33000576_p).toHaveTextContaining('A33000576') // assertText=12
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.mr_div).toHaveTextContaining('Mr') // assertText=13
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.ongZhiPing_div).toHaveTextContaining('ONG ZHI PING') // assertText=14
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.zhiPing_div).toHaveTextContaining('ZHI PING') // assertText=15
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.ong_div).toHaveTextContaining('ONG') // assertText=16
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.male_div).toHaveTextContaining('Male') // assertText=17
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page._18072002_div).toHaveTextContaining('18/07/2002') // assertText=18
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.singaporeCitizen_div).toHaveTextContaining('SINGAPORE CITIZEN') // assertText=19
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.singaporeCitizen_div).toHaveTextContaining('SINGAPORE CITIZEN') // assertText=20
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.taoist_div).toHaveTextContaining('Taoist') // assertText=21
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.chinese_div).toHaveTextContaining('Chinese') // assertText=22
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.single_div).toHaveTextContaining('Single') // assertText=23
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.s8781065h_div).toHaveTextContaining('S8781065H') // assertText=24
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page._820446_div).toHaveTextContaining('820446') // assertText=25
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page._446_div).toHaveTextContaining('446') // assertText=26
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.punggolWay_div).toHaveTextContaining('PUNGGOL WAY') // assertText=27
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page._121008_div).toHaveTextContaining('#12-1008') // assertText=28
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.singapore_div).toHaveTextContaining('SINGAPORE') // assertText=29
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.hlTehYahooCom_div).toHaveTextContaining('hl.teh@yahoo.com') // assertText=30
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page._6588885555_div).toHaveTextContaining('65 88885555') // assertText=31
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page._6544447777_div).toHaveTextContaining('65 44447777') // assertText=32
  })
})
