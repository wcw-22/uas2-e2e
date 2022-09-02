'use strict';

const Page = require('../Page')

class ApplicantportalAppApplicantFinancialaidFormFinancialPage1 extends Page {
  get applicationFinancialAid_app_message () { return $('H3 > APP-MESSAGE') } 
  get nolabel_li1 () { return $('DIV.col-12 > OL > LI:nth-of-type(1)') } 
  get nolabel_li2 () { return $('DIV.col-12 > OL > LI:nth-of-type(2)') } 
  get nolabel_li3 () { return $('DIV.col-12 > OL > LI:nth-of-type(3)') } 
  get nolabel_div () { return $('DIV:nth-of-type(8) > DIV.col-12') } 
  get next_app_message () { return $('#faNextButton > APP-MESSAGE') } 
  get saveApplication_app_message () { return $('#faSaveAsDraftButton > APP-MESSAGE') } 
  get addFamilyMember_button () { return $('DIV:nth-of-type(2) > DIV.col-12.text-end > BUTTON[type="button"]') } 
  get addFamilyMember_app_message1 () { return $('H4.modal-title.float-start > APP-MESSAGE') } 
  get nolabel_li4 () { return $('DIV:nth-of-type(2) > DIV.row.mt-0 > DIV.col-12 > OL > LI:nth-of-type(1)') } 
  get nolabel_li5 () { return $('DIV:nth-of-type(2) > DIV.row.mt-0 > DIV.col-12 > OL > LI:nth-of-type(2)') } 
  get nolabel_li6 () { return $('DIV:nth-of-type(2) > DIV.row.mt-0 > DIV.col-12 > OL > LI:nth-of-type(3)') } 
  get nolabel_textInput1 () { return $('DIV:nth-of-type(1) > DIV:nth-of-type(2) > INPUT[type="text"]') } 
  get teeTeckHuat_textInput () { return $('DIV:nth-of-type(1) > DIV:nth-of-type(2) > INPUT[type="text"]') } 
  get nolabel_select1 () { return $('DIV:nth-of-type(2) > DIV:nth-of-type(2) > SELECT.form-select') } 
  get nolabel_textInput2 () { return $('DIV:nth-of-type(3) > DIV:nth-of-type(2) > INPUT[type="text"]') } 
  get _1980_textInput () { return $('DIV:nth-of-type(3) > DIV:nth-of-type(2) > INPUT[type="text"]') } 
  get nolabel_select2 () { return $('DIV:nth-of-type(4) > DIV:nth-of-type(2) > SELECT.form-select') } 
  get nolabel_select3 () { return $('DIV:nth-of-type(5) > DIV:nth-of-type(2) > SELECT.form-select') } 
  get nolabel_select4 () { return $('DIV:nth-of-type(6) > DIV:nth-of-type(2) > SELECT.form-select') } 
  get yes_radioInput1 () { return $('#new_stayingWithApplicantFlagYes') } 
  get yes_radioInput2 () { return $('#new_stayingWithApplicantFlagYes') } 
  get nolabel_textInput3 () { return $('DIV:nth-of-type(8) > DIV:nth-of-type(2) > INPUT[type="text"]') } 
  get superman_textInput () { return $('DIV:nth-of-type(8) > DIV:nth-of-type(2) > INPUT[type="text"]') } 
  get nolabel_select5 () { return $('DIV:nth-of-type(9) > DIV:nth-of-type(2) > SELECT.form-select') } 
  get nolabel_textInput4 () { return $('DIV:nth-of-type(10) > DIV:nth-of-type(2) > INPUT[type="text"]') } 
  get marvel_textInput () { return $('DIV:nth-of-type(10) > DIV:nth-of-type(2) > INPUT[type="text"]') } 
  get nolabel_textInput5 () { return $('DIV:nth-of-type(3) > INPUT[type="text"]') } 
  get _1500_textInput () { return $('DIV:nth-of-type(3) > INPUT[type="text"]') } 
  get yes_radioInput3 () { return $('#new__employedA1_ableToProvideSalarySlipFlagYes') } 
  get yes_radioInput4 () { return $('#new__employedA1_ableToProvideSalarySlipFlagYes') } 
  get addFamilyMember_app_message2 () { return $('DIV:nth-of-type(12) > DIV.col-12.text-end > BUTTON > APP-MESSAGE') } 
  get medicalCondition_strong () { return $('DIV:nth-of-type(4) > DIV.col-12 > H6 > STRONG') } 
  get nolabel_app_message1 () { return $('FORM.mb-5.mt-4 > DIV:nth-of-type(5) > DIV:nth-of-type(1) > APP-MESSAGE') } 
  get yes_label () { return $('DIV:nth-of-type(1) > LABEL.form-check-label') } 
  get yes_radioInput5 () { return $('#medicalConditionYes') } 
  get yes_radioInput6 () { return $('#medicalConditionYes') } 
  get addMedicalCondition_button () { return $('DIV:nth-of-type(6) > DIV.col-12.text-end > BUTTON[type="button"]') } 
  get addMedicalCondition_app_message () { return $('H4.modal-title.float-start > APP-MESSAGE') } 
  get instructions_app_message () { return $('DIV.col-12 > P:nth-of-type(1) > APP-MESSAGE') } 
  get nolabel_app_message2 () { return $('P:nth-of-type(2) > APP-MESSAGE') } 
  get nolabel_strong () { return $('DIV:nth-of-type(1) > DIV.col-12 > H6 > STRONG') } 
  get name_select () { return $('DIV:nth-of-type(2) > DIV:nth-of-type(2) > SELECT.form-select') } 
  get medicalcondition_textInput () { return $('INPUT[type="text"][name="medicalCondition"]') } 
  get medicalcondition_textInput () { return $('INPUT[type="text"][name="medicalCondition"]') } 
  get dateofbill_textInput () { return $('INPUT[type="text"][name="dateOfBill"]') } 
  get amountpaidbypatient_textInput () { return $('INPUT[type="text"][name="amountPaidByPatient"]') } 
  get amountpaidbypatient_textInput () { return $('INPUT[type="text"][name="amountPaidByPatient"]') } 
  get amountpaidbyinsurance_textInput () { return $('INPUT[type="text"][name="amountPaidByInsurance"]') } 
  get amountpaidbyinsurance_textInput () { return $('INPUT[type="text"][name="amountPaidByInsurance"]') } 
  get typeoftreatment_textInput () { return $('INPUT[type="text"][name="typeOfTreatment"]') } 
  get typeoftreatment_textInput () { return $('INPUT[type="text"][name="typeOfTreatment"]') } 
  get addBill_app_message () { return $('DIV:nth-of-type(3) > BUTTON > APP-MESSAGE') } 
  get addMedicalCondition_app_message () { return $('DIV:nth-of-type(10) > DIV.col-12.text-end > BUTTON > APP-MESSAGE') } 
  get nolabel_app_message3 () { return $('STRONG > APP-MESSAGE:nth-of-type(1)') } 
  get familyfinancialsituationsummary_text () { return $('TEXTAREA') } 
  get familyfinancialsituationsummary_text () { return $('TEXTAREA') } 
  get familyfinancialsituationsummary_text () { return $('TEXTAREA') } 
  get familyfinancialsituationsummary_text () { return $('TEXTAREA') } 
  get formWasSavedSuccessfully_li () { return $('UL.mb-0 > LI') } 
  get nolabel_li7 () { return $('UL.mb-0 > LI') } 
  get familyfinancialsituationsummary_text () { return $('TEXTAREA') } 
  get familyfinancialsituationsummary_text () { return $('TEXTAREA') } 

  open() {
    return super.open('/applicantPortal/app/applicant/financialaid/form/financial/32466821-8b72-4112-91f1-fb76212a58ac') // update as needed
  }
} // end of class ApplicantportalAppApplicantFinancialaidFormFinancialPage

module.exports = new ApplicantportalAppApplicantFinancialaidFormFinancialPage1();

