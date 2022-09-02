'use strict';

const Page = require('../Page')

class OamadminportalAppContentAdmissionAdmissionapplicationSearch_01Page extends Page {
  get zhiPingOng_p () { return $('APP-ADMISSION-APPLICATION-SEARCH > #content-container > DIV.container-large > DIV:nth-of-type(2) > DIV:nth-of-type(2) > #admissionApplicationSearchResultTable > DIV:nth-of-type(1) > #admissionApplicationSearchResultTable-table > TBODY > TR > TD:nth-of-type(3) > P.form-control-plaintext') } 

  open() {
    return super.open('/oamadminportal/app/content/admission/admissionapplication/search') // update as needed
  }
} // end of class OamadminportalAppContentAdmissionAdmissionapplicationSearch_01Page

module.exports = new OamadminportalAppContentAdmissionAdmissionapplicationSearch_01Page();

