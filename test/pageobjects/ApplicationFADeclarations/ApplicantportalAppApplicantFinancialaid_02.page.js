'use strict';

const Page = require('../Page')

class ApplicantportalAppApplicantFinancialaid_02Page extends Page {
  get enquireApplicationStatus_app_message () { return $('APP-FINANCIALAID-MENU > DIV.container-lg > DIV:nth-of-type(2) > DIV.col-12 > UL.list-unstyled > LI:nth-of-type(2) > A > APP-MESSAGE') } 

  open() {
    return super.open('/applicantPortal/app/applicant/financialaid') // update as needed
  }
} // end of class ApplicantportalAppApplicantFinancialaid_02Page

module.exports = new ApplicantportalAppApplicantFinancialaid_02Page();

