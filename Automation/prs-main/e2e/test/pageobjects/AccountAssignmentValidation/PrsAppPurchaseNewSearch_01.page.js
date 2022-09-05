const Page = require('../Page')

class PrsAppPurchaseNewSearch_01Page extends Page {
  get biological_span () { return $('LI:nth-of-type(2) > A.nav-link > SPAN') } 
  get add_button () { return $('TR:nth-of-type(1) > TD:nth-of-type(4) > BUTTON[type="button"]') } 
  get scientificName_textInput () { return $('#biologicalScientificName') } 
  get search_button () { return $('#biologicalSearchButton') } 

  open() {
    return super.open('/prs/app/purchase/new/search/8d031f98-d519-41bb-837d-06ffbe13e5f1') // update as needed
  }
} // end of class PrsAppPurchaseNewSearch_01Page

module.exports = new PrsAppPurchaseNewSearch_01Page();

