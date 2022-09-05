const Page = require('../Page')

class PrsAppPurchaseNewItems_04Page extends Page {
  get lineitemsupplier2_textInput () { return $('NG-SELECT > DIV > DIV > DIV:nth-of-type(2) > INPUT[type="text"]') } 

  open() {
    return super.open('/prs/app/purchase/new/items/ff3d89ae-f9f4-44bd-a137-aef222467732') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_04Page

module.exports = new PrsAppPurchaseNewItems_04Page();

