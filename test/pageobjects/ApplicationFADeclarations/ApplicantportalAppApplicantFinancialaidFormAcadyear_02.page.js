'use strict';

const Page = require('../Page')

class ApplicantportalAppApplicantFinancialaidFormAcadyear_02Page extends Page {
  get proceedToApply_app_message () { return $('#faNextButton > APP-MESSAGE') } 

  open() {
    return super.open('/applicantPortal/app/applicant/financialaid/form/acadyear/8aea0ba9-a42b-4614-a269-27cc32510d3a') // update as needed
  }
} // end of class ApplicantportalAppApplicantFinancialaidFormAcadyear_02Page

module.exports = new ApplicantportalAppApplicantFinancialaidFormAcadyear_02Page();

