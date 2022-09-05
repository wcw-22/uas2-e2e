const Page = require('../Page')

class PrsAppPurchaseNewSearch_02Page extends Page {
  get nolabel_app_purchase_search () { return $('APP-PURCHASE-SEARCH') } 
  get biological_span () { return $('LI:nth-of-type(2) > A.nav-link > SPAN') } 
  get addnewlineitem0_button () { return $('TR:nth-of-type(1) > TD:nth-of-type(3) > BUTTON[type="button"]') } 
  get scientificName_textInput () { return $('#biologicalScientificName') } 
  get biologicalsearchbutton_button () { return $('#biologicalSearchButton') } 

  open() {
    return super.open('/prs/app/purchase/new/search/ff3d89ae-f9f4-44bd-a137-aef222467732') // update as needed
  }
} // end of class PrsAppPurchaseNewSearch_02Page

module.exports = new PrsAppPurchaseNewSearch_02Page();

