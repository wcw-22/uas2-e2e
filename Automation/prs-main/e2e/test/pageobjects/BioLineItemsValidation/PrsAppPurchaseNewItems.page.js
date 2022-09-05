const Page = require('../Page')

class PrsAppPurchaseNewItemsPage extends Page {
  get nextbutton_button () { return $('#nextButton') } 
  get nolabel_div () { return $('APP-ROOT > DIV:nth-of-type(2)') } 

  open() {
    return super.open('/prs/app/purchase/new/items/5f264cc6-a749-4b02-802c-faa384de3228') // update as needed
  }
} // end of class PrsAppPurchaseNewItemsPage

module.exports = new PrsAppPurchaseNewItemsPage();

