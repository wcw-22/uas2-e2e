const Page = require('../Page')

class PrsAppPurchaseNewSearch_01Page extends Page {
  get biological_span () { return $('LI:nth-of-type(2) > A.nav-link > SPAN') } 
  get add_button () { return $('TR:nth-of-type(1) > TD:nth-of-type(4) > BUTTON[type="button"]') } 
  //get scientificName_textInput () { return $('#scientificName') } 
 // get search_button () { return $('APP-PURCHASE-SEARCH-BIOLOGICAL > FORM.form-horizontal > #targetMainButton > DIV.button-group.text-right.col-md-12 > BUTTON[type="submit"]') } 
  get scientificName_textInput () { return $('#biologicalScientificName') } 
  get search_button () { return $('#biologicalSearchButton') } 
  open() {
    return super.open('/prs/app/purchase/new/search/a75c81e0-2444-43ff-9f95-3fd813316050') // update as needed
  }
} // end of class PrsAppPurchaseNewSearch_01Page

module.exports = new PrsAppPurchaseNewSearch_01Page();

