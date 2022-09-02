'use strict';

const Page = require('../Page')

class ApplicantportalAppApplicantFinancialaidFormAcadyear_01Page extends Page {
  get applicationFinancialAid_app_message () { return $('H3 > APP-MESSAGE') } 
  get nolabel_strong () { return $('STRONG') } 
  get nolabel_p () { return $('P:nth-of-type(1)') } 
  get nolabel_app_message1 () { return $('P:nth-of-type(2) > APP-MESSAGE') } 
  get nolabel_app_message2 () { return $('P:nth-of-type(3) > APP-MESSAGE') } 
  get proceedToApply_app_message () { return $('#faNextButton > APP-MESSAGE') } 

  open() {
    return super.open('/applicantPortal/app/applicant/financialaid/form/acadyear/47fb5b90-fd5d-42e3-ab69-0dc770523760') // update as needed
  }
} // end of class ApplicantportalAppApplicantFinancialaidFormAcadyear_01Page

module.exports = new ApplicantportalAppApplicantFinancialaidFormAcadyear_01Page();

