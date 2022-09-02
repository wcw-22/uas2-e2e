'use strict';

const Page = require('../Page')

class ApplicantportalAppLogin_02Page extends Page {
  get applicationNumber_textInput () { return $('#appid') } 
  get personalIdentificationNumberPin_passwordInput () { return $('#pin') } 
  get signIn_app_message () { return $('BUTTON > APP-MESSAGE') } 

  open() {
    return super.open('/applicantPortal/app/login') // update as needed
  }
} // end of class ApplicantportalAppLogin_02Page

module.exports = new ApplicantportalAppLogin_02Page();

