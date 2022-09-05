const Page = require('../Page')

class PrsAppPurchaseNewSearchPage extends Page {
  get product_radioInput () { return $('LABEL:nth-of-type(3) > INPUT[type="radio"][name="displayOption"]') } 
  get chemicalName_textInput () { return $('#chemicalName') } 
  get search_button () { return $('#chemicalSearchButton') } 

  open() {
    return super.open('/prs/app/purchase/new/search/8d031f98-d519-41bb-837d-06ffbe13e5f1') // update as needed
  }
} // end of class PrsAppPurchaseNewSearchPage

module.exports = new PrsAppPurchaseNewSearchPage();

