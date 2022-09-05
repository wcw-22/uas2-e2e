const Page = require('../Page')

class PrsAppPurchaseNewItems_05Page extends Page {
  get saveasdraftbutton_button () { return $('#saveAsDraftButton') } 

  open() {
    return super.open('/prs/app/purchase/new/items/5f264cc6-a749-4b02-802c-faa384de3228') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_05Page

module.exports = new PrsAppPurchaseNewItems_05Page();

