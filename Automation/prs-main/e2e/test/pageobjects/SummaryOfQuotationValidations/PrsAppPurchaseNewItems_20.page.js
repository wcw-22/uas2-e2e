const Page = require('../Page')

class PrsAppPurchaseNewItems_20Page extends Page {
  get lineitemsupplier1_textInput () { return $('NG-SELECT > DIV > DIV > DIV:nth-of-type(2) > INPUT[type="text"]') } 
  get abbot_span () { return $('NG-DROPDOWN-PANEL > DIV.scroll-host > DIV:nth-of-type(2) > DIV > SPAN') } 

  open() {
    return super.open('/prs/app/purchase/new/items/6013fcbc-66f4-495e-97d7-2a103b9185f5') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_20Page

module.exports = new PrsAppPurchaseNewItems_20Page();

