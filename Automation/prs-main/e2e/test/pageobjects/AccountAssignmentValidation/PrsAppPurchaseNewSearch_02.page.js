const Page = require('../Page')

class PrsAppPurchaseNewSearch_02Page extends Page {
  get radioactive_span () { return $('LI:nth-of-type(3) > A.nav-link > SPAN') } 
  get radionuclideS_textInput () { return $('#radionuclides') } 
  get search_button () { return $('#radioactiveSearchButton') } 
  get add_button () { return $('TR:nth-of-type(1) > TD:nth-of-type(3) > BUTTON[type="button"]') } 

  open() {
    return super.open('/prs/app/purchase/new/search/8d031f98-d519-41bb-837d-06ffbe13e5f1') // update as needed
  }
} // end of class PrsAppPurchaseNewSearch_02Page

module.exports = new PrsAppPurchaseNewSearch_02Page();

