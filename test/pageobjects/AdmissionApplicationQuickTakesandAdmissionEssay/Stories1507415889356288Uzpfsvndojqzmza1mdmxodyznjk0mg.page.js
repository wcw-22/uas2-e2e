'use strict';

const Page = require('../Page')

class Stories1507415889356288Uzpfsvndojqzmza1mdmxodyznjk0mgPage extends Page {
  get search_app_message () { return $('BUTTON > APP-MESSAGE') } 
  get a33000576_p () { return $('APP-ADMISSION-APPLICATION-SEARCH > #content-container > DIV.container-large > DIV:nth-of-type(2) > DIV:nth-of-type(2) > #admissionApplicationSearchResultTable > DIV:nth-of-type(1) > #admissionApplicationSearchResultTable-table > TBODY > TR > TD:nth-of-type(2) > P.form-control-plaintext') } 

  open() {
    return super.open('/stories/1507415889356288/UzpfSVNDOjQzMzA1MDMxODYzNjk0Mg==/?bucket_count=9&source=story_tray') // update as needed
  }
} // end of class Stories1507415889356288Uzpfsvndojqzmza1mdmxodyznjk0mgPage

module.exports = new Stories1507415889356288Uzpfsvndojqzmza1mdmxodyznjk0mgPage();

