const Page = require('../Page')

class PrsAppPurchaseNewAorSearchPage extends Page {
  get radioactive_span () { return $('LI:nth-of-type(3) > A.nav-link > SPAN') } 
  get radionuclideS_textInput () { return $('#radionuclides') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/search/12593d5b-9d0b-456e-b79f-921cfdc1acca') // update as needed
  }
} // end of class PrsAppPurchaseNewAorSearchPage

module.exports = new PrsAppPurchaseNewAorSearchPage();

