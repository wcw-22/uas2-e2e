const Page = require('../Page')

class PrsAppPurchaseNewSearchPage extends Page {
  get product_radioInput () { return $('LABEL:nth-of-type(3) > INPUT[type="radio"][name="displayOption"]') } 
  get chemicalName_textInput () { return $('#chemicalName') } 
  get search_button () { return $('APP-PURCHASE-SEARCH-CHEMICAL > FORM.form-horizontal > #targetMainButton > DIV.button-group.text-right.col-md-12 > BUTTON[type="submit"]') } 
  get chemicalsearchbutton_button () { return $('#chemicalSearchButton') } 
  
  open() {
    return super.open('/prs/app/purchase/new/search/a75c81e0-2444-43ff-9f95-3fd813316050') // update as needed
  }
} // end of class PrsAppPurchaseNewSearchPage

module.exports = new PrsAppPurchaseNewSearchPage();

