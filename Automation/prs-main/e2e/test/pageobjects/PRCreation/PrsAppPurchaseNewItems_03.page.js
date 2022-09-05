const Page = require('../Page')

class PrsAppPurchaseNewItems_03Page extends Page {
  get next_button () { return $('BUTTON:nth-of-type(3)') } 
  get _1PlusPrivateLimited_span () { return $('NG-DROPDOWN-PANEL > DIV.scroll-host > DIV:nth-of-type(2) > DIV > SPAN') } 

  open() {
    return super.open('/prs/app/purchase/new/items/a75c81e0-2444-43ff-9f95-3fd813316050') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_03Page

module.exports = new PrsAppPurchaseNewItems_03Page();

