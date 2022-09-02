'use strict';

/*** Generated spec file ***/
const OamadminportalAppLoginPage = require('../pageobjects/AdmissionApplicationQuickTakesandAdmissionEssay/OamadminportalAppLogin.page')
const OamadminportalAppContentSwitchrolePage = require('../pageobjects/AdmissionApplicationQuickTakesandAdmissionEssay/OamadminportalAppContentSwitchrole.page')
const OamadminportalAppContentDashboardPage = require('../pageobjects/AdmissionApplicationQuickTakesandAdmissionEssay/OamadminportalAppContentDashboard.page')
const OamadminportalAppContentAdmissionAdmissionapplicationSearchPage = require('../pageobjects/AdmissionApplicationQuickTakesandAdmissionEssay/OamadminportalAppContentAdmissionAdmissionapplicationSearch.page')
const Stories1507415889356288Uzpfsvndojqzmza1mdmxodyznjk0mgPage = require('../pageobjects/AdmissionApplicationQuickTakesandAdmissionEssay/Stories1507415889356288Uzpfsvndojqzmza1mdmxodyznjk0mg.page')
const Stories1507415889356288Uzpfsvndojqzmza1mdmxodyznjk0mg_01Page = require('../pageobjects/AdmissionApplicationQuickTakesandAdmissionEssay/Stories1507415889356288Uzpfsvndojqzmza1mdmxodyznjk0mg_01.page')
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
  })

  it('should execute Stories1507415889356288Uzpfsvndojqzmza1mdmxodyznjk0mgPage', async () => {
    await (await Stories1507415889356288Uzpfsvndojqzmza1mdmxodyznjk0mgPage.search_app_message).click() // click=9
    await (await Stories1507415889356288Uzpfsvndojqzmza1mdmxodyznjk0mgPage.a33000576_p).click() // click=10
  })

  it('should execute Stories1507415889356288Uzpfsvndojqzmza1mdmxodyznjk0mg_01Page', async () => {
    await expect(await Stories1507415889356288Uzpfsvndojqzmza1mdmxodyznjk0mg_01Page.nolabel_app_message).toHaveTextContaining('Nus College Quick Takes and Admission Essay') // assertText=11
    await expect(await Stories1507415889356288Uzpfsvndojqzmza1mdmxodyznjk0mg_01Page.nolabel_b1).toHaveTextContaining('Instructions for Quick Takes: Please respond in 250 characters or fewer to each of the following questions.') // assertText=12
    await expect(await Stories1507415889356288Uzpfsvndojqzmza1mdmxodyznjk0mg_01Page.nolabel_p1).toHaveTextContaining('1) If you were on a deserted island with a group of 10 people, what would be your first course of action?') // assertText=13
    await expect(await Stories1507415889356288Uzpfsvndojqzmza1mdmxodyznjk0mg_01Page.food_p).toHaveTextContaining('food') // assertText=14
    await expect(await Stories1507415889356288Uzpfsvndojqzmza1mdmxodyznjk0mg_01Page.nolabel_p2).toHaveTextContaining('2) What item represents your community or a community you are in?') // assertText=15
    await expect(await Stories1507415889356288Uzpfsvndojqzmza1mdmxodyznjk0mg_01Page.harmony_p).toHaveTextContaining('Harmony') // assertText=16
    await expect(await Stories1507415889356288Uzpfsvndojqzmza1mdmxodyznjk0mg_01Page.nolabel_p3).toHaveTextContaining('3) What is the first thing you say to yourself when you find yourself outside of your comfort zone?') // assertText=17
    await expect(await Stories1507415889356288Uzpfsvndojqzmza1mdmxodyznjk0mg_01Page.patience_p).toHaveTextContaining('Patience') // assertText=18
    await expect(await Stories1507415889356288Uzpfsvndojqzmza1mdmxodyznjk0mg_01Page.nolabel_b2).toHaveTextContaining('Instructions for Short Answer: Please respond in 500 characters or fewer to one of the following questions.') // assertText=19
    await expect(await Stories1507415889356288Uzpfsvndojqzmza1mdmxodyznjk0mg_01Page.nolabel_p4).toHaveTextContaining('4a) Describe a time when you influenced change in your community and how it was received. Or\n4b) What would you like to initiate in the NUS College community?') // assertText=20
    await expect(await Stories1507415889356288Uzpfsvndojqzmza1mdmxodyznjk0mg_01Page.manageChange_p).toHaveTextContaining('Manage change') // assertText=21
    await expect(await Stories1507415889356288Uzpfsvndojqzmza1mdmxodyznjk0mg_01Page.nolabel_b3).toHaveTextContaining('Instructions for Essay: Write an original essay of no more than 3000 characters on one of the following topics. (For reference, 3000 characters approximates to 430-750 words). Not only should your essay be original, but we urge you not to reuse essays that you have written for other occasions and purposes. You can assume an intelligent but non-specialist audience: thus, you may want to avoid overly technical topics, or at least write about them using more generalist language. Your essay should give us some insight into you and your thought processes, and help us consider if the NUS College is right for you. Our students tend to be curious, critical, and engaged. Thus, they are open to learning new things and making connections; they are also analytical and reflective, and strive to connect thinking and doing.') // assertText=22
    await expect(await Stories1507415889356288Uzpfsvndojqzmza1mdmxodyznjk0mg_01Page.nolabel_p5).toHaveTextContaining('1. Nowadays, on internet forums and social media, some people like to post "hot takes": succinct and often controversial opinions that they think go against the grain of conventional wisdom. However, the term "hot take" started as a derogatory label, to refer to journalistic opinion pieces written without much research, that court controversy and thus seek to attract readers or clicks. As a result of this complicated history, "hot takes" can be meant seriously or sarcastically. Do you have a "hot take"? And do you have a take, hot or otherwise, on hot takes?') // assertText=23
    await expect(await Stories1507415889356288Uzpfsvndojqzmza1mdmxodyznjk0mg_01Page.nolabel_p6).toHaveTextContaining('2. What new "fact" or bit of "knowledge" did you recently learn on your own, outside of your classroom instruction? The fact that you identify does not need to be "new" in itself (what matters is that it was new to you), and you can have learned or discovered this fact from anywhere at all (it does not have to be from a "learned" or "academic" source). Tell us: how you came upon this fact; why is it interesting to you (and/or why you think it should be interesting to the larger community); how (if in any way) you feel your life (or the world) is changed by the knowledge of this fact; and anything else you feel like telling us about this fantastic, interesting, possibly important, new-to-you knowledge or fact.') // assertText=24
    await expect(await Stories1507415889356288Uzpfsvndojqzmza1mdmxodyznjk0mg_01Page.nolabel_p7).toHaveTextContaining('3. Do you have a motto you live by? Do you have a personal brand? Tell us what it is, and what led you to develop this motto or personal brand. In addition, we would like to know: Do you see these terms—"motto" and "personal brand"—as equivalent? And what do you think, more generally, about the phenomenon of having a motto or, as is more common nowadays, people thinking of themselves as having brands?') // assertText=25
    await expect(await Stories1507415889356288Uzpfsvndojqzmza1mdmxodyznjk0mg_01Page.innovative_p).toHaveTextContaining('Innovative') // assertText=26
  })
})
