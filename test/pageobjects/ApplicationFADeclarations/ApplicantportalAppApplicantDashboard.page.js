'use strict';

const Page = require('../Page')

class ApplicantportalAppApplicantDashboardPage extends Page {
  get financialAid_link () { return $('LI:nth-of-type(3) > A.nav-link') } 

  open() {
    return super.open('/applicantPortal/app/applicant/dashboard') // update as needed
  }
} // end of class ApplicantportalAppApplicantDashboardPage

module.exports = new ApplicantportalAppApplicantDashboardPage();

