'use strict';

const Page = require('../Page')

class OamadminportalAppContentAdmissionAdmissionapplicationSearchPage extends Page {
  get applicationNumber_textInput () { return $('#applNo') } 

  open() {
    return super.open('/oamadminportal/app/content/admission/admissionapplication/search') // update as needed
  }
} // end of class OamadminportalAppContentAdmissionAdmissionapplicationSearchPage

module.exports = new OamadminportalAppContentAdmissionAdmissionapplicationSearchPage();

