const Page = require('../Page')

class PrsAppPurchaseNewItems_12Page extends Page {
  get nextbutton_button () { return $('#nextButton') } 
  get _3mTechnologiesSPteLtd_span () { return $('NG-DROPDOWN-PANEL > DIV.scroll-host > DIV:nth-of-type(2) > DIV > SPAN') } 

  open() {
    return super.open('/prs/app/purchase/new/items/6013fcbc-66f4-495e-97d7-2a103b9185f5') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_12Page

module.exports = new PrsAppPurchaseNewItems_12Page();

