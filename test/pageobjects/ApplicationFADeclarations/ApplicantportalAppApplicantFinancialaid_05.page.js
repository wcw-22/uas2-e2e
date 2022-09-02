'use strict';

const Page = require('../Page')

class ApplicantportalAppApplicantFinancialaid_05Page extends Page {
  get applyFinancialAid_app_message () { return $('LI:nth-of-type(1) > A > APP-MESSAGE') } 

  open() {
    return super.open('/applicantPortal/app/applicant/financialaid') // update as needed
  }
} // end of class ApplicantportalAppApplicantFinancialaid_05Page

module.exports = new ApplicantportalAppApplicantFinancialaid_05Page();

