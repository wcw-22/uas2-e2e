'use strict';

/*** Generated spec file ***/
const OamadminportalAppLoginPage = require('../pageobjects/AdmissionApplicationTermsAndConditions/OamadminportalAppLogin.page')
const OamadminportalAppContentSwitchrolePage = require('../pageobjects/AdmissionApplicationTermsAndConditions/OamadminportalAppContentSwitchrole.page')
const OamadminportalAppContentDashboardPage = require('../pageobjects/AdmissionApplicationTermsAndConditions/OamadminportalAppContentDashboard.page')
const OamadminportalAppContentAdmissionAdmissionapplicationSearchPage = require('../pageobjects/AdmissionApplicationTermsAndConditions/OamadminportalAppContentAdmissionAdmissionapplicationSearch.page')
const OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page = require('../pageobjects/AdmissionApplicationTermsAndConditions/OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576.page')
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
    await (await OamadminportalAppContentAdmissionAdmissionapplicationSearchPage.search_app_message).click() // click=9
    await (await OamadminportalAppContentAdmissionAdmissionapplicationSearchPage.a33000576_p).click() // click=10
  })

  it('should execute OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page', async () => {
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.termsAndConditions_app_message).toHaveTextContaining('Terms And Conditions') // assertText=11
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.nolabel_app_message1).toHaveTextContaining('I have read and I agree to the terms and conditions contained in the Privacy Notice.') // assertText=12
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.nolabel_app_message2).toHaveTextContaining('I agree to receive marketing, advertising and promotional information from NUS via postal mail, electronic mail and/or SMS/MMS. (Optional)') // assertText=13
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.nolabel_app_message3).toHaveTextContaining('I agree to receive marketing, advertising and promotional information from NUS at my provided telephone number(s) via voice call/phone call. (Optional)') // assertText=14
    const checkbox1 = await $('//*[@id="content-container"]/app-admission-application-view/div[1]/app-terms-conditions-view/div/div/div[2]/div[1]/div[1]/input')
    let chkbox1 = (await checkbox1.isSelected()) 
    console.log(chkbox1)
    expect(chkbox1).toEqual(true) 

    const checkbox2 = await $('//*[@id="content-container"]/app-admission-application-view/div[1]/app-terms-conditions-view/div/div/div[2]/div[2]/div[1]/input')
    let chkbox2 = (await checkbox2.isSelected()) 
    console.log(chkbox2)
    expect(chkbox2).toEqual(false) 

    const checkbox3 = await $('//*[@id="content-container"]/app-admission-application-view/div[1]/app-terms-conditions-view/div/div/div[2]/div[3]/div[1]/input')
    let chkbox3 = (await checkbox3.isSelected()) 
    console.log(chkbox3)
    expect(chkbox3).toEqual(false) 

   })
})
