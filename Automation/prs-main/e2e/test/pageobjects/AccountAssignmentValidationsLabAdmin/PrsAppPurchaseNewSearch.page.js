const Page = require('../Page')

class PrsAppPurchaseNewSearchPage extends Page {
  get catalogue_radioInput () { return $('#chemicalFilterProductsChk-catalogue') } 
  get chemicalName_textInput () { return $('#chemicalName') } 
  get chemicalsearchbutton_button () { return $('#chemicalSearchButton') } 

  open() {
    return super.open('/prs/app/purchase/new/search/ff3d89ae-f9f4-44bd-a137-aef222467732') // update as needed
  }
} // end of class PrsAppPurchaseNewSearchPage

module.exports = new PrsAppPurchaseNewSearchPage();

