'use strict';

const Page = require('../Page')

class ApplicantportalAppApplicantFinancialaidFormDonatedPage extends Page {
  get applicationFinancialAid_app_message () { return $('H3 > APP-MESSAGE') } 
  get nusDonatedBursaryScheme_strong () { return $('DIV:nth-of-type(1) > DIV.col-12 > H6 > U > STRONG') } 
  get nolabel_p1 () { return $('DIV:nth-of-type(2) > DIV.col-12 > P:nth-of-type(1)') } 
  get nolabel_p2 () { return $('P:nth-of-type(2)') } 
  get nolabel_p3 () { return $('P:nth-of-type(3)') } 
  get nolabel_strong () { return $('DIV:nth-of-type(3) > DIV.col-12 > H6 > U > STRONG') } 
  get nolabel_p4 () { return $('DIV:nth-of-type(4) > DIV.col-12 > P') } 
  get iWishToBeConsideredForTheNusDonatedBursarySchemeIncludingFacultyDonatedBursariesAndAgreeToTheConditionsAbove_radioInput () { return $('#donatedBursaryYes') } 
  get nolabel_label1 () { return $('DIV:nth-of-type(1) > DIV.form-check.form-check-inline > LABEL.form-check-label') } 
  get nolabel_label2 () { return $('DIV:nth-of-type(2) > DIV.form-check.form-check-inline > LABEL.form-check-label') } 
  get iDoNotWishToBeConsideredForTheNusDonatedBursarySchemeIncludingFacultyDonatedBursaries_radioInput () { return $('#donatedBursaryNo') } 
  //get iDoNotWishToBeConsideredForTheNusDonatedBursarySchemeIncludingFacultyDonatedBursaries_radioInput () { return $('#donatedBursaryNo') } 
  get nolabel_p5 () { return $('DIV.modal-body > P') } 
  get ok_app_message () { return $('DIV.modal-body > DIV > BUTTON > APP-MESSAGE') } 

  open() {
    return super.open('/applicantPortal/app/applicant/financialaid/form/donated/8aea0ba9-a42b-4614-a269-27cc32510d3a') // update as needed
  }
} // end of class ApplicantportalAppApplicantFinancialaidFormDonatedPage

module.exports = new ApplicantportalAppApplicantFinancialaidFormDonatedPage();

