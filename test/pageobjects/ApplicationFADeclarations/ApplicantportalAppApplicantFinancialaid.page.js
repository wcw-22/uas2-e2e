'use strict';

const Page = require('../Page')

class ApplicantportalAppApplicantFinancialaidPage extends Page {
  get financialAid_h5 () { return $('H5') } 
  get applyFinancialAid_app_message () { return $('APP-FINANCIALAID-MENU > DIV.container-lg > DIV:nth-of-type(2) > DIV.col-12 > UL.list-unstyled > LI:nth-of-type(1) > A > APP-MESSAGE') } 

  open() {
    return super.open('/applicantPortal/app/applicant/financialaid') // update as needed
  }
} // end of class ApplicantportalAppApplicantFinancialaidPage

module.exports = new ApplicantportalAppApplicantFinancialaidPage();

