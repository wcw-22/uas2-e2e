'use strict';

const Page = require('../Page')

class OamadminportalAppContentAdmissionAdmissionapplicationSearchPage extends Page {
  get nolabel_h3 () { return $('H3') } 
  get applicationNumber_textInput () { return $('#applNo') } 
  get search_app_message () { return $('BUTTON > APP-MESSAGE') } 
  get a33000576_p () { return $('APP-ADMISSION-APPLICATION-SEARCH > #content-container > DIV.container-large > DIV:nth-of-type(2) > DIV:nth-of-type(2) > #admissionApplicationSearchResultTable > DIV:nth-of-type(1) > #admissionApplicationSearchResultTable-table > TBODY > TR > TD:nth-of-type(2) > P.form-control-plaintext') } 

  open() {
    return super.open('/oamadminportal/app/content/admission/admissionapplication/search') // update as needed
  }
} // end of class OamadminportalAppContentAdmissionAdmissionapplicationSearchPage

module.exports = new OamadminportalAppContentAdmissionAdmissionapplicationSearchPage();

