'use strict';

/*** Generated spec file ***/
const OamadminportalAppLoginPage = require('../pageobjects/AdmissionApplicationEducation/OamadminportalAppLogin.page')
const OamadminportalAppContentSwitchrolePage = require('../pageobjects/AdmissionApplicationEducation/OamadminportalAppContentSwitchrole.page')
const OamadminportalAppContentDashboardPage = require('../pageobjects/AdmissionApplicationEducation/OamadminportalAppContentDashboard.page')
const OamadminportalAppContentAdmissionAdmissionapplicationSearchPage = require('../pageobjects/AdmissionApplicationEducation/OamadminportalAppContentAdmissionAdmissionapplicationSearch.page')
const OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page = require('../pageobjects/AdmissionApplicationEducation/OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576.page')
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
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.nolabel_app_message1).toHaveTextContaining('Education - Singapore-Cambridge GCE \'A\' Level') // assertText=11
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.nameOfSchool_app_message).toHaveTextContaining('Name of School') // assertText=12
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.nolabel_div1).toHaveTextContaining('Hwa Chong Junior College/ Hwa Chong Institution') // assertText=13
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.yearOfExamination_app_message).toHaveTextContaining('Year of Examination') // assertText=14
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page._2021_div).toHaveTextContaining('2021') // assertText=15
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.nolabel_app_message2).toHaveTextContaining('If graduated more than a year ago, the activities engaged (current/past)') // assertText=16
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.servingNationalService_div).toHaveTextContaining('Serving National Service') // assertText=17
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.nolabel_app_message3).toHaveTextContaining('Use Mother Tongue Language Bonus Point') // assertText=18
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.yes_div).toHaveTextContaining('Yes') // assertText=19
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.nolabel_app_message4).toHaveTextContaining('I have re-taken Singapore-Cambridge GCE \'A\' Level examination as a private candidate after graduating from my school') // assertText=20
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.no_div).toHaveTextContaining('No') // assertText=21
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.didYouTakeMotherTongue_app_message).toHaveTextContaining('Did you take Mother Tongue?') // assertText=22
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.gceALevelMotherTongue_div).toHaveTextContaining('GCE \'A\' Level Mother Tongue') // assertText=23
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.nolabel_app_message5).toHaveTextContaining('Mother Tongue/Mother Tongue Syllabus B/Subject-In-Lieu:') // assertText=24
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.chinese_div).toHaveTextContaining('Chinese') // assertText=25
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.h1_div).toHaveTextContaining('H1') // assertText=26
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.a_div).toHaveTextContaining('A') // assertText=27
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.nolabel_app_message6).toHaveTextContaining('H1, H2, H3 , \'A\' AND/OR \'AO\' SUBJECTS') // assertText=28
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.physics_td).toHaveTextContaining('Physics') // assertText=29
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.h1_td).toHaveTextContaining('H1') // assertText=30
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.a_td).toHaveTextContaining('A') // assertText=31
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.biology_td).toHaveTextContaining('Biology') // assertText=32
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.h2_td).toHaveTextContaining('H2') // assertText=33
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.a_td).toHaveTextContaining('A') // assertText=34
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.chemistry_td).toHaveTextContaining('Chemistry') // assertText=35
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.h2_td).toHaveTextContaining('H2') // assertText=36
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.a_td).toHaveTextContaining('A') // assertText=37
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.history_td).toHaveTextContaining('History') // assertText=38
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.h1_td).toHaveTextContaining('H1') // assertText=39
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.b_td).toHaveTextContaining('B') // assertText=40
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.economics_td).toHaveTextContaining('Economics') // assertText=41
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.h1_td).toHaveTextContaining('H1') // assertText=42
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.b_td).toHaveTextContaining('B') // assertText=43
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.art_td).toHaveTextContaining('Art') // assertText=44
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.h3_td).toHaveTextContaining('H3') // assertText=45
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.m_td).toHaveTextContaining('M') // assertText=46
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.projectWork_td).toHaveTextContaining('Project Work') // assertText=47
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.h1_td).toHaveTextContaining('H1') // assertText=48
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.a_td).toHaveTextContaining('A') // assertText=49
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.nolabel_app_message7).toHaveTextContaining('IMPROVED SUBJECT GRADE FROM A DIFFERENT SITTING') // assertText=50
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.generalPaperKi_td).toHaveTextContaining('General Paper/ KI') // assertText=51
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.h1_td).toHaveTextContaining('H1') // assertText=52
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page._2021_td).toHaveTextContaining('2021') // assertText=53
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.a_td).toHaveTextContaining('A') // assertText=54
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.nolabel_app_message8).toHaveTextContaining('Please indicate if there is missing \'A\' Level results.') // assertText=55
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.no_div).toHaveTextContaining('No') // assertText=56
    await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.pleaseProvideDetails_app_message).toHaveTextContaining('Please provide details') // assertText=57
    //await expect(await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.nolabel_div2).toHaveTextContaining('assertText') // assertText=58
    const pleaseProvideDetailsField = await (await OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page.nolabel_div2).getText()
    expect(pleaseProvideDetailsField).toEqual('')
  })
})
