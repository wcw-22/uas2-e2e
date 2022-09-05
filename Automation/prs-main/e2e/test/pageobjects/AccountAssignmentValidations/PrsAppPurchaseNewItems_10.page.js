const Page = require('../Page')

class PrsAppPurchaseNewItems_10Page extends Page {
  get nolabel_div () { return $('DIV.container-large.clearfix') } 
  get lineitemsupplier5_textInput () { return $('NG-SELECT > DIV > DIV > DIV:nth-of-type(2) > INPUT[type="text"]') } 

  open() {
    return super.open('/prs/app/purchase/new/items/ff3d89ae-f9f4-44bd-a137-aef222467732') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_10Page

module.exports = new PrsAppPurchaseNewItems_10Page();

