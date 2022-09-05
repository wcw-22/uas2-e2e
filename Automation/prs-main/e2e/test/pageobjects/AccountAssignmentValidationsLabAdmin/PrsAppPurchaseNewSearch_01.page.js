const Page = require('../Page')

class PrsAppPurchaseNewSearch_01Page extends Page {
  get radioactive_link () { return $('LI:nth-of-type(3) > A.nav-link') } 
  get radionuclideS_textInput () { return $('#radionuclides') } 
  get radioactivesearchbutton_button () { return $('#radioactiveSearchButton') } 
  get addnewlineitem0_button () { return $('TD:nth-of-type(4) > BUTTON[type="button"]') } 

  open() {
    return super.open('/prs/app/purchase/new/search/ff3d89ae-f9f4-44bd-a137-aef222467732') // update as needed
  }
} // end of class PrsAppPurchaseNewSearch_01Page

module.exports = new PrsAppPurchaseNewSearch_01Page();

