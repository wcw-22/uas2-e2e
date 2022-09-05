const Page = require('../Page')

class PrsAppPurchaseNewSearch_09Page extends Page {
  get radioactive_span () { return $('LI:nth-of-type(3) > A.nav-link > SPAN') } 
  get radionuclideS_textInput () { return $('#radionuclides') } 
  get radioactivesearchbutton_button () { return $('#radioactiveSearchButton') } 

  open() {
    return super.open('/prs/app/purchase/new/search/6013fcbc-66f4-495e-97d7-2a103b9185f5') // update as needed
  }
} // end of class PrsAppPurchaseNewSearch_09Page

module.exports = new PrsAppPurchaseNewSearch_09Page();

