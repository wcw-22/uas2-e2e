'use strict';

const Page = require('../Page')

class ApplicantportalAppApplicantFinancialaidFormDonatedPage1 extends Page {
  get next_app_message () { return $('#faNextButton > APP-MESSAGE') } 

  open() {
    return super.open('/applicantPortal/app/applicant/financialaid/form/donated/32466821-8b72-4112-91f1-fb76212a58ac') // update as needed
  }
} // end of class ApplicantportalAppApplicantFinancialaidFormDonatedPage1

module.exports = new ApplicantportalAppApplicantFinancialaidFormDonatedPage1();

