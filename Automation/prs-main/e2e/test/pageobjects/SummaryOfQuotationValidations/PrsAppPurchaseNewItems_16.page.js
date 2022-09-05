const Page = require('../Page')

class PrsAppPurchaseNewItems_16Page extends Page {
  get lineitemsupplier1_textInput () { return $('NG-SELECT > DIV > DIV > DIV:nth-of-type(2) > INPUT[type="text"]') } 

  open() {
    return super.open('/prs/app/purchase/new/items/6013fcbc-66f4-495e-97d7-2a103b9185f5') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_16Page

module.exports = new PrsAppPurchaseNewItems_16Page();

