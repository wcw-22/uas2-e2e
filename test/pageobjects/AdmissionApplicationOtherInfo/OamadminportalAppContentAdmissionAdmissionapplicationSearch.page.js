'use strict';

const Page = require('../Page')

class OamadminportalAppContentAdmissionAdmissionapplicationSearchPage extends Page {
  get menuadmissionaccess_link () { return $('#menuAdmissionAccess') } 
  get menuadmissionapplicationsearch_link () { return $('#menuAdmissionApplicationSearch') } 

  open() {
    return super.open('/oamadminportal/app/content/admission/admissionapplication/search') // update as needed
  }
} // end of class OamadminportalAppContentAdmissionAdmissionapplicationSearchPage

module.exports = new OamadminportalAppContentAdmissionAdmissionapplicationSearchPage();

