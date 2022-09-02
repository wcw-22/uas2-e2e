'use strict';

const Page = require('../Page')

class OamadminportalAppContentAdmissionAdmissionapplicationSearch_03Page extends Page {
  get nolabel_p () { return $('APP-ADMISSION-APPLICATION-SEARCH > #content-container > DIV.container-large > DIV:nth-of-type(2) > DIV:nth-of-type(2) > #admissionApplicationSearchResultTable > DIV:nth-of-type(1) > #admissionApplicationSearchResultTable-table > TBODY > TR > TD:nth-of-type(5) > P.form-control-plaintext') } 

  open() {
    return super.open('/oamadminportal/app/content/admission/admissionapplication/search') // update as needed
  }
} // end of class OamadminportalAppContentAdmissionAdmissionapplicationSearch_03Page

module.exports = new OamadminportalAppContentAdmissionAdmissionapplicationSearch_03Page();

