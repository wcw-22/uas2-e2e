const Page = require('../Page')

class PrsAppPurchaseNewItems_01Page extends Page {
  get nextbutton_button () { return $('#nextButton') } 
  get _1PlusPrivateLimited_span () { return $('NG-DROPDOWN-PANEL > DIV.scroll-host > DIV:nth-of-type(2) > DIV > SPAN') } 

  open() {
    return super.open('/prs/app/purchase/new/items/69f4633a-fadd-474e-9e27-363a4beea0de') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_01Page

module.exports = new PrsAppPurchaseNewItems_01Page();

