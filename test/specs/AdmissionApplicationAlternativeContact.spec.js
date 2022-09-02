'use strict';

/*** Generated spec file ***/
const OamadminportalAppLoginPage = require('../pageobjects/AdmissionApplicationAlternativeContact/OamadminportalAppLogin.page')
const OamadminportalAppContentSwitchrolePage = require('../pageobjects/AdmissionApplicationAlternativeContact/OamadminportalAppContentSwitchrole.page')
const OamadminportalAppContentDashboardPage = require('../pageobjects/AdmissionApplicationAlternativeContact/OamadminportalAppContentDashboard.page')
const OamadminportalAppContentAdmissionAdmissionapplicationSearchPage = require('../pageobjects/AdmissionApplicationAlternativeContact/OamadminportalAppContentAdmissionAdmissionapplicationSearch.page')
const OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page = require('../pageobjects/AdmissionApplicationAlternativeContact/OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576.page')
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
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.sohYeeLing_div).toHaveTextContaining('Soh Yee Ling') // assertText=11
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.mother_div).toHaveTextContaining('Mother') // assertText=12
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.housewife_div).toHaveTextContaining('Housewife') // assertText=13
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page._6566667777_div).toHaveTextContaining('65 66667777') // assertText=14
    const HomeTel = await (await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.nolabel_div).getText()
    expect(HomeTel).toEqual('')
   // await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.nolabel_div).toHaveTextContaining(null) // assertText=15
   
    
   //async function veryNullValue(x) {
    //if (x) {
      //console.log(x)
      //console.log('empty value')
      //return passed
      
    //} else {
   //   console.log(x)
   //   console.log('should be empty value')
   //   return failed
   // }
  //}

  //veryNullValue(HomeTel)

  })
})
