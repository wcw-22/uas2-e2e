const Page = require('../Page')

class PrsAppPurchaseNewSearchPage extends Page {
  get chemicalName_textInput () { return $('#chemicalName') } 
  get search_button () { return $('#chemicalSearchButton') } 
  get add_button () { return $('TR:nth-of-type(1) > TD:nth-of-type(4) > BUTTON[type="button"]') } 
  get next_button () { return $('APP-PURCHASE-SEARCH > DIV > DIV:nth-of-type(2) > DIV.text-right > DIV.row > DIV.col-md-12 > BUTTON:nth-of-type(2)') } 

  open() {
    return super.open('/prs/app/purchase/new/search/6c267d15-71e9-4c1c-9ad9-264002974baf') // update as needed
  }
} // end of class PrsAppPurchaseNewSearchPage

module.exports = new PrsAppPurchaseNewSearchPage();

