'use strict';

/*** Generated spec file ***/
const OamadminportalAppLoginPage = require('../pageobjects/AdmissionApplicationRefereeNomination/OamadminportalAppLogin.page')
const OamadminportalAppContentSwitchrolePage = require('../pageobjects/AdmissionApplicationRefereeNomination/OamadminportalAppContentSwitchrole.page')
const OamadminportalAppContentDashboardPage = require('../pageobjects/AdmissionApplicationRefereeNomination/OamadminportalAppContentDashboard.page')
const OamadminportalAppContentAdmissionAdmissionapplicationSearchPage = require('../pageobjects/AdmissionApplicationRefereeNomination/OamadminportalAppContentAdmissionAdmissionapplicationSearch.page')
const OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page = require('../pageobjects/AdmissionApplicationRefereeNomination/OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576.page')
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
    await (await OamadminportalAppContentDashboardPage.applicationNumber_textInput).click() // click=7
  })

  it('should execute OamadminportalAppContentAdmissionAdmissionapplicationSearchPage', async () => {
    await (await OamadminportalAppContentAdmissionAdmissionapplicationSearchPage.applicationNumber_textInput).setValueByKeys('33000576') // change=8
    await (await OamadminportalAppContentAdmissionAdmissionapplicationSearchPage.search_app_message).click() // click=9
    await (await OamadminportalAppContentAdmissionAdmissionapplicationSearchPage.a33000576_p).click() // click=10
  })

  it('should execute OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page', async () => {
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.refereeNomination_app_message).toHaveTextContaining('Referee Nomination') // assertText=11
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.salutation_app_message).toHaveTextContaining('Salutation') // assertText=12
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.miss_td).toHaveTextContaining('MISS') // assertText=13
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.fullName_app_message).toHaveTextContaining('Full Name') // assertText=14
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.euniceLoo_td).toHaveTextContaining('Eunice Loo') // assertText=15
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.givenName_app_message).toHaveTextContaining('Given Name') // assertText=16
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.eunice_td).toHaveTextContaining('Eunice') // assertText=17
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.designation_app_message).toHaveTextContaining('Designation') // assertText=18
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.teacher_td).toHaveTextContaining('Teacher') // assertText=19
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.organisation_app_message).toHaveTextContaining('Organisation') // assertText=20
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.hwaChongInstitution_td).toHaveTextContaining('Hwa Chong Institution') // assertText=21
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.relationship_app_message).toHaveTextContaining('Relationship') // assertText=22
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.teacher_td).toHaveTextContaining('Teacher') // assertText=23
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.contactNumber_app_message).toHaveTextContaining('Contact Number') // assertText=24
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page._6577773333_td).toHaveTextContaining('65 77773333') // assertText=25
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.email_app_message).toHaveTextContaining('Email') // assertText=26
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.hlTehYahooCom_td).toHaveTextContaining('hl.teh@yahoo.com') // assertText=27
  })
})
