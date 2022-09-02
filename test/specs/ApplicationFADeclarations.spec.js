'use strict';

/*** Generated spec file ***/
const ApplicantportalAppLoginPage = require('../pageobjects/ApplicationFADeclarations/ApplicantportalAppLogin.page')
const ApplicantportalAppLogin_02Page = require('../pageobjects/ApplicationFADeclarations/ApplicantportalAppLogin_02.page')
const ApplicantportalAppApplicantDashboardPage = require('../pageobjects/ApplicationFADeclarations/ApplicantportalAppApplicantDashboard.page')
const ApplicantportalAppApplicantFinancialaidPage = require('../pageobjects/ApplicationFADeclarations/ApplicantportalAppApplicantFinancialaid.page')
const ApplicantportalAppApplicantFinancialaid_02Page = require('../pageobjects/ApplicationFADeclarations/ApplicantportalAppApplicantFinancialaid_02.page')
const ApplicantportalAppApplicantFinancialaid_05Page = require('../pageobjects/ApplicationFADeclarations/ApplicantportalAppApplicantFinancialaid_05.page')
const ApplicantportalAppApplicantFinancialaidFormAcadyear_01Page = require('../pageobjects/ApplicationFADeclarations/ApplicantportalAppApplicantFinancialaidFormAcadyear_01.page')
const ApplicantportalAppApplicantFinancialaidFormAcadyear_02Page = require('../pageobjects/ApplicationFADeclarations/ApplicantportalAppApplicantFinancialaidFormAcadyear_02.page')
const ApplicantportalAppApplicantFinancialaidFormDonatedPage = require('../pageobjects/ApplicationFADeclarations/ApplicantportalAppApplicantFinancialaidFormDonated.page')
//const ApplicantportalAppApplicantFinancialaidFormDonatedPage1 = require('../pageobjects/ApplicationFMandMC/ApplicantportalAppApplicantFinancialaidFormDonated1.page')
const ApplicantportalAppApplicantFinancialaidFormFinancialPage1 = require('../pageobjects/ApplicationFMandMC/ApplicantportalAppApplicantFinancialaidFormFinancial1.page')
let dataVariables = {};

describe('Undergraduate Applicant Portal', () => {
  it('should execute ApplicantportalAppLoginPage', async () => {
    await ApplicantportalAppLoginPage.open()

    await (await ApplicantportalAppLoginPage.applicationNumber_textInput).click() // click=0
  })

  it('should execute ApplicantportalAppLogin_02Page', async () => {
    await (await ApplicantportalAppLogin_02Page.applicationNumber_textInput).click() // click=1
    await (await ApplicantportalAppLogin_02Page.applicationNumber_textInput).setValueByKeys('43000031') // change=2
    await (await ApplicantportalAppLogin_02Page.personalIdentificationNumberPin_passwordInput).click() // click=3
    await (await ApplicantportalAppLogin_02Page.personalIdentificationNumberPin_passwordInput).setValueByKeys('abcd1234') // change=4
    await (await ApplicantportalAppLogin_02Page.signIn_app_message).click() // click=5
  })

  it('should execute ApplicantportalAppApplicantDashboardPage', async () => {
    await (await ApplicantportalAppApplicantDashboardPage.financialAid_link).click() // click=6
  })

  it('should execute ApplicantportalAppApplicantFinancialaidPage', async () => {
    await expect(await ApplicantportalAppApplicantFinancialaidPage.financialAid_h5).toHaveTextContaining('Financial Aid') // assertText=7
    await expect(await ApplicantportalAppApplicantFinancialaidPage.applyFinancialAid_app_message).toHaveTextContaining('Apply Financial Aid') // assertText=8
  })

  it('should execute ApplicantportalAppApplicantFinancialaid_02Page', async () => {
    await expect(await ApplicantportalAppApplicantFinancialaid_02Page.enquireApplicationStatus_app_message).toHaveTextContaining('Enquire Application Status') // assertText=9
  })

  it('should execute ApplicantportalAppApplicantFinancialaid_05Page', async () => {
    await (await ApplicantportalAppApplicantFinancialaid_05Page.applyFinancialAid_app_message).click() // click=10
  })

  it('should execute ApplicantportalAppApplicantFinancialaidFormAcadyear_01Page', async () => {
    await expect(await ApplicantportalAppApplicantFinancialaidFormAcadyear_01Page.applicationFinancialAid_app_message).toHaveTextContaining('Application - Financial Aid') // assertText=11
    await expect(await ApplicantportalAppApplicantFinancialaidFormAcadyear_01Page.nolabel_strong).toHaveTextContaining('Application for Financial Aid for Prospective/Incoming Undergraduate Students') // assertText=12
    await expect(await ApplicantportalAppApplicantFinancialaidFormAcadyear_01Page.nolabel_p).toHaveTextContaining('Application for Financial Aid for Academic Year 2023/2024') // assertText=13
    await expect(await ApplicantportalAppApplicantFinancialaidFormAcadyear_01Page.nolabel_app_message1).toHaveTextContaining('You may apply for Financial Aid once you have applied for admission. Applications are open throughout the academic year. For an early consideration for NUS Donated Bursaries, please apply by the admission application deadline.') // assertText=14
    await expect(await ApplicantportalAppApplicantFinancialaidFormAcadyear_01Page.nolabel_app_message2).toHaveTextContaining('Please apply only in the year that you are beginning your undergraduate studies and do not apply using your iBLOC or Special Term admission application or Student number). Please apply for Financial Aid as a Prospective Undergraduate Student using your full-time undergraduate admission application no. and PIN.') // assertText=15
    await expect(await ApplicantportalAppApplicantFinancialaidFormAcadyear_01Page.proceedToApply_app_message).toHaveTextContaining('Proceed to apply') // assertText=16
  })

  it('should execute ApplicantportalAppApplicantFinancialaidFormAcadyear_02Page', async () => {
    await (await ApplicantportalAppApplicantFinancialaidFormAcadyear_02Page.proceedToApply_app_message).click() // click=17
  })

  it('should execute ApplicantportalAppApplicantFinancialaidFormDonatedPage', async () => {
    await expect(await ApplicantportalAppApplicantFinancialaidFormDonatedPage.applicationFinancialAid_app_message).toHaveTextContaining('Application - Financial Aid') // assertText=18
    await expect(await ApplicantportalAppApplicantFinancialaidFormDonatedPage.nusDonatedBursaryScheme_strong).toHaveTextContaining('NUS Donated Bursary Scheme') // assertText=19
    await expect(await ApplicantportalAppApplicantFinancialaidFormDonatedPage.nolabel_p1).toHaveTextContaining('Please note that successful applicants for financial aid will be considered for NUS Donated Bursaries as part of the NUS Financial Aid Package (including Faculty Donated Bursaries). These bursaries are funded by donations and each bursary is at least $1,500 per annum.') // assertText=20
    await expect(await ApplicantportalAppApplicantFinancialaidFormDonatedPage.nolabel_p2).toHaveTextContaining('Students eligible for the donated bursaries will be contacted from June/July onwards and may be required to attend interviews.') // assertText=21
    await expect(await ApplicantportalAppApplicantFinancialaidFormDonatedPage.nolabel_p3).toHaveTextContaining('Successful recipients are required to (1) submit appreciation letters to donors, (2) attend meet-up session with donors, (3) provide assistance at Faculty and/or University events.') // assertText=22
    await expect(await ApplicantportalAppApplicantFinancialaidFormDonatedPage.nolabel_strong).toHaveTextContaining('Intention to Apply for the NUS Donated Bursary Scheme and Declaration') // assertText=23
    await expect(await ApplicantportalAppApplicantFinancialaidFormDonatedPage.nolabel_p4).toHaveTextContaining('I understand that if I choose to be considered for the NUS Donated Bursary Scheme (including Faculty Bursaries), I may be required to attend interviews and if awarded, I will be required to submit appreciation letters to donors, attend meet-up session with donors and provide assistance at Faculty or University events.') // assertText=24
    await expect(await ApplicantportalAppApplicantFinancialaidFormDonatedPage.nolabel_label1).toHaveTextContaining('I wish to be considered for the NUS Donated Bursary Scheme (including Faculty Donated Bursaries) and agree to the conditions above.') // assertText=25
    await (await ApplicantportalAppApplicantFinancialaidFormDonatedPage.iWishToBeConsideredForTheNusDonatedBursarySchemeIncludingFacultyDonatedBursariesAndAgreeToTheConditionsAbove_radioInput).click() // click=26
    await expect(await ApplicantportalAppApplicantFinancialaidFormDonatedPage.nolabel_label2).toHaveTextContaining('I do not wish to be considered for the NUS Donated Bursary Scheme (including Faculty Donated Bursaries)') // assertText=27
    //await (await ApplicantportalAppApplicantFinancialaidFormDonatedPage.iDoNotWishToBeConsideredForTheNusDonatedBursarySchemeIncludingFacultyDonatedBursaries_radioInput).click() // click=28
    await (await ApplicantportalAppApplicantFinancialaidFormDonatedPage.iDoNotWishToBeConsideredForTheNusDonatedBursarySchemeIncludingFacultyDonatedBursaries_radioInput).click() // change=29 - radioInput
    //console.log("testing12312312312312312312321312321")
 
    await expect(await ApplicantportalAppApplicantFinancialaidFormDonatedPage.nolabel_p5).toHaveTextContaining('Please note that you will not be considered for the NUS Donated Bursary Scheme but you will still be considered for the Higher Education Bursary, Higher Education Community Bursary, Opportunity Enhancement Grant, Residential Programme Bursary, Residential College Bursary, Hall Bursary and College Grant.') // assertText=30
    const popupMsg = await (await ApplicantportalAppApplicantFinancialaidFormDonatedPage.nolabel_p5 ).getText()
    //console.log(popupMsg)
   
    const OK_btn = await (await $('//app-message[(text() = "Ok" or . = "Ok")]'))
    //console.log("searh for ok button:" + OK_btn)
    OK_btn.click()
    //await (await ApplicantportalAppApplicantFinancialaidFormDonatedPage.ok_app_message).click() // click=31
    await (await ApplicantportalAppApplicantFinancialaidFormDonatedPage.iWishToBeConsideredForTheNusDonatedBursarySchemeIncludingFacultyDonatedBursariesAndAgreeToTheConditionsAbove_radioInput).click() // click=26
    //await (await ApplicantportalAppApplicantFinancialaidFormDonatedPage.iWishToBeConsideredForTheNusDonatedBursarySchemeIncludingFacultyDonatedBursariesAndAgreeToTheConditionsAbove_radioInput).click() // click=32
    //await (await ApplicantportalAppApplicantFinancialaidFormDonatedPage.iWishToBeConsideredForTheNusDonatedBursarySchemeIncludingFacultyDonatedBursariesAndAgreeToTheConditionsAbove_radioInput).click() // change=33 - radioInput

    const Next_btn = await (await $('//*[@id="faNextButton"]/app-message'))
    Next_btn.click()
    
  })

  //it('should execute ApplicantportalAppApplicantFinancialaidFormDonatedPage1', async () => {
    //await ApplicantportalAppApplicantFinancialaidFormDonatedPage1.open()

    //await (await ApplicantportalAppApplicantFinancialaidFormDonatedPage1.next_app_message).click() // click=0
  //})

  it('should execute ApplicantportalAppApplicantFinancialaidFormFinancialPage1', async () => {
    await expect(await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.applicationFinancialAid_app_message).toHaveTextContaining('Application - Financial Aid') // assertText=1
    await expect(await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.nolabel_li1).toHaveTextContaining('For current employed persons, all information on earnings must be accompanied by income document.') // assertText=2
    await expect(await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.nolabel_li2).toHaveTextContaining('Information provided must include all immediate family members and dependents. If you are married, please include your spouse and children.') // assertText=3
    await expect(await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.nolabel_li3).toHaveTextContaining('The monthly gross income must include all income or receipts from the following: a) salary, b) rental c) interest/investment income; or its equivalent.') // assertText=4
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.addFamilyMember_button).click() // click=5
    await expect(await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.addFamilyMember_app_message1).toHaveTextContaining('Add Family Member') // assertText=6
    await expect(await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.nolabel_li4).toHaveTextContaining('For current employed persons, all information on earnings must be accompanied by income document.') // assertText=7
    await expect(await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.nolabel_li5).toHaveTextContaining('Information provided must include all immediate family members and dependents. If you are married, please include your spouse and children.') // assertText=8
    await expect(await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.nolabel_li6).toHaveTextContaining('The monthly gross income must include all income or receipts from the following: a) salary, b) rental c) interest/investment income; or its equivalent.') // assertText=9
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.nolabel_textInput1).click() // click=10
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.teeTeckHuat_textInput).setValueByKeys('Tee Teck Huat') // change=11
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.nolabel_select1).selectByVisibleText('Singapore Citizen') // change=12 - select
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.nolabel_textInput2).click() // click=13
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1._1980_textInput).setValueByKeys('1980') // change=14
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.nolabel_select2).selectByVisibleText('Married') // change=15 - select
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.nolabel_select3).selectByVisibleText('Employed') // change=16 - select
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.nolabel_select4).selectByVisibleText('Father') // change=17 - select
   // await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.yes_radioInput1).click() // click=18
   const stayingWithApplicantFlagYes_Rbtn = await (await $('//*[@id="new_stayingWithApplicantFlagYes"]'))
   stayingWithApplicantFlagYes_Rbtn.click()   
    //await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.yes_radioInput2).click() // change=19 - radioInput
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.nolabel_textInput3).click() // click=20
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.superman_textInput).setValueByKeys('Superman') // change=21
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.nolabel_select5).selectByVisibleText('Full-Time') // change=22 - select
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.nolabel_textInput4).click() // click=23
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.marvel_textInput).setValueByKeys('Marvel') // change=24
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.nolabel_textInput5).click() // click=25
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1._1500_textInput).setValueByKeys('1500') // change=26
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.yes_radioInput3).click() // click=27
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.yes_radioInput4).click() // change=28 - radioInput
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.addFamilyMember_app_message2).click() // click=29
    await expect(await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.medicalCondition_strong).toHaveTextContaining('Medical Condition') // assertText=30
    await expect(await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.nolabel_app_message1).toHaveTextContaining('Are you or any of your family members who are staying in the same household as you are suffering from any physical or mental disability or medical condition?') // assertText=31
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.yes_label).click() // click=32
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.yes_radioInput5).click() // click=33
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.yes_radioInput6).click() // change=34 - radioInput
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.addMedicalCondition_button).click() // click=35
    await expect(await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.addMedicalCondition_app_message).toHaveTextContaining('Add Medical Condition') // assertText=36
    await expect(await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.instructions_app_message).toHaveTextContaining('Instructions') // assertText=37
    await expect(await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.nolabel_app_message2).toHaveTextContaining('Please upload (a) document stating medical condition(s) from a certified general practitioner / doctor (if available); and (b) latest 3-months medical bills (if available).') // assertText=38
    await expect(await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.nolabel_strong).toHaveTextContaining('Details of Family Member/Applicant With Medical Condition(s)') // assertText=39
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.name_select).selectByVisibleText('Tee Teck Huat') // change=40 - select
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.medicalcondition_textInput).click() // click=41
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.medicalcondition_textInput).setValueByKeys('not good') // change=42
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.dateofbill_textInput).click() // click=43
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.dateofbill_textInput).setValueByKeys('01/09/2022')
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.dateofbill_textInput).click() // click=43
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.amountpaidbypatient_textInput).click() // click=44
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.amountpaidbypatient_textInput).setValueByKeys('100') // change=45
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.amountpaidbyinsurance_textInput).click() // click=46
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.amountpaidbyinsurance_textInput).setValueByKeys('500') // change=47
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.typeoftreatment_textInput).click() // click=48
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.typeoftreatment_textInput).setValueByKeys('x-ray') // change=49
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.addBill_app_message).click() // click=50
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.addMedicalCondition_app_message).click() // click=51
    await expect(await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.nolabel_app_message3).toHaveTextContaining('Summary of current family financial situation which explains your need for financial aid') // assertText=52
    const MinMaxChrelem = await $('//app-message[(text() = "\[Min 200, Max 3500 characters\]" or . = "\[Min 200, Max 3500 characters\]")]')
    await expect(MinMaxChrelem ).toHaveText('[Min 200, Max 3500 characters]')
    await expect(await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.nolabel_div).toHaveTextContaining('Instruction: For copy & paste, please copy to notepad / text pad, count the no. of characters before copy and paste here.') // assertText=53
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.familyfinancialsituationsummary_text).click() // click=54
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.familyfinancialsituationsummary_text).click() // click=55
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.familyfinancialsituationsummary_text).click() // click=56
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.familyfinancialsituationsummary_text).setValue('poor1234567890POOR!@#$%^&*()_+No money poor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No money') // change=57
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.saveApplication_app_message).click() // click=58
    await expect(await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.formWasSavedSuccessfully_li).toHaveTextContaining('Form was saved successfully.') // assertText=59
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.next_app_message).click() // click=60
    await expect(await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.nolabel_li7).toHaveTextContaining('"Summary of current family financial situation which explains your need for financial aid." must be at between 200 and 3500 characters.') // assertText=61
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.familyfinancialsituationsummary_text).click() // click=62
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.familyfinancialsituationsummary_text).setValue('poor1234567890POOR!@#$%^&*()_+No money poor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoor1234567890POOR!@#$%^&*()_+No moneypoo') // change=63
    await (await ApplicantportalAppApplicantFinancialaidFormFinancialPage1.next_app_message).click() // click=64
  })


})
