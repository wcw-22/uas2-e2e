'use strict';

const Page = require('../Page')

class ApplicantportalAppLoginPage extends Page {
  get applicationNumber_textInput () { return $('#appid') } 
  get personalIdentificationNumberPin_passwordInput () { return $('#pin') } 
  get nolabel_i () { return $('I.fas.fa-users.pe-3') } 

  open() {
    return super.open('/applicantPortal/app/login') // update as needed
  }
} // end of class ApplicantportalAppLoginPage

module.exports = new ApplicantportalAppLoginPage();

