const Page = require('../Page')

class PrsAppPurchaseNewConfirmation_02Page extends Page {
  get confirmationHeading_div () { return $('APP-PURCHASE-CONFIRMATION > DIV > DIV:nth-of-type(1) > DIV.col-md-12') } 

  open() {
    return super.open('/prs/app/purchase/new/confirmation/6013fcbc-66f4-495e-97d7-2a103b9185f5') // update as needed
  }
} // end of class PrsAppPurchaseNewConfirmation_02Page

module.exports = new PrsAppPurchaseNewConfirmation_02Page();

