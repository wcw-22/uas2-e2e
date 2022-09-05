const Page = require('./page')

class PrsAppPurchaseNewAorSearch_RadioPage extends Page {
  get radioactive_link () { return $('LI:nth-of-type(3) > A.nav-link') } 
  get radionuclideS_textInput () { return $('#radionuclides') } 
  get search_button () { return $('#radioactiveSearchButton') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/search/ea4af94f-b4a4-4871-8b0c-b66f5c8dc0f7') // update as needed
  }
} // end of class PrsAppPurchaseNewAorSearch_RadioPage

module.exports = new PrsAppPurchaseNewAorSearch_RadioPage();

