const Page = require('../Page')

class PrsAppPurchaseNewSearch_04Page extends Page {
  get radioactive_link () { return $('LI:nth-of-type(3) > A.nav-link') } 
  get addnewlineitem0_button () { return $('TR:nth-of-type(1) > TD:nth-of-type(4) > BUTTON[type="button"]') } 
  get radionuclideS_div () { return $('APP-PURCHASE-SEARCH-RADIOACTIVE > FORM.form-horizontal > DIV:nth-of-type(1)') } 
  get radionuclideS_textInput () { return $('#radionuclides') } 
  get radioactivesearchbutton_button () { return $('#radioactiveSearchButton') } 

  open() {
    return super.open('/prs/app/purchase/new/search/ff3d89ae-f9f4-44bd-a137-aef222467732') // update as needed
  }
} // end of class PrsAppPurchaseNewSearch_04Page

module.exports = new PrsAppPurchaseNewSearch_04Page();

