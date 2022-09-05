const Page = require('../Page')

class PrsAppPurchaseNewSearchPage extends Page {
  get catalogue_radioInput () { return $('#chemicalFilterProductsChk-catalogue') } 
  get chemicalName_textInput () { return $('#chemicalName') } 
  get chemicalsearchbutton_button () { return $('#chemicalSearchButton') } 

  open() {
    return super.open('/prs/app/purchase/new/search/8cae6024-664d-4199-be35-126e4f4d9b30') // update as needed
  }
} // end of class PrsAppPurchaseNewSearchPage

module.exports = new PrsAppPurchaseNewSearchPage();

