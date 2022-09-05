const Page = require('../Page')

class PrsAppPurchaseNewConfirmation_04Page extends Page {
  get confirmsubmitbutton_button () { return $('#confirmSubmitButton') } 

  open() {
    return super.open('/prs/app/purchase/new/confirmation/6013fcbc-66f4-495e-97d7-2a103b9185f5') // update as needed
  }
} // end of class PrsAppPurchaseNewConfirmation_04Page

module.exports = new PrsAppPurchaseNewConfirmation_04Page();

