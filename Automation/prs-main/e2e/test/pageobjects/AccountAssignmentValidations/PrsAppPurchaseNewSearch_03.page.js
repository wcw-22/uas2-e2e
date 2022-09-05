const Page = require('../Page')

class PrsAppPurchaseNewSearch_03Page extends Page {
  get chemical_span () { return $('LI:nth-of-type(1) > A.nav-link > SPAN') } 
  get product_radioInput () { return $('#chemicalFilterProductsChk-product') } 
  get chemicalName_textInput () { return $('#chemicalName') } 
  get chemicalsearchbutton_button () { return $('#chemicalSearchButton') } 
  get addnewlineitem0_button () { return $('#biologicalSearchResultTable-table > TBODY > TR:nth-of-type(1) > TD:nth-of-type(3) > BUTTON[type="button"]') } 

  open() {
    return super.open('/prs/app/purchase/new/search/ff3d89ae-f9f4-44bd-a137-aef222467732') // update as needed
  }
} // end of class PrsAppPurchaseNewSearch_03Page

module.exports = new PrsAppPurchaseNewSearch_03Page();

