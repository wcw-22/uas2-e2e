const Page = require('../Page')

class PrsAppPurchaseNewSearchPage extends Page {
  get product_radioInput () { return $('#chemicalFilterProductsChk-product') } 
  get chemicalName_textInput () { return $('#chemicalName') } 
  get chemicalsearchbutton_button () { return $('#chemicalSearchButton') } 

  open() {
    return super.open('/prs/app/purchase/new/search/69f4633a-fadd-474e-9e27-363a4beea0de') // update as needed
  }
} // end of class PrsAppPurchaseNewSearchPage

module.exports = new PrsAppPurchaseNewSearchPage();

