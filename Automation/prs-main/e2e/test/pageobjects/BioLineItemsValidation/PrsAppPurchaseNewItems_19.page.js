const Page = require('../Page')

class PrsAppPurchaseNewItems_19Page extends Page {
  get quantityperunit0_numberInput () { return $('DIV:nth-of-type(4) > INPUT[type="number"]') } 
  get nextbutton_button () { return $('#nextButton') } 
  open() {
    return super.open('/prs/app/purchase/new/items/5f264cc6-a749-4b02-802c-faa384de3228') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_19Page

module.exports = new PrsAppPurchaseNewItems_19Page();

