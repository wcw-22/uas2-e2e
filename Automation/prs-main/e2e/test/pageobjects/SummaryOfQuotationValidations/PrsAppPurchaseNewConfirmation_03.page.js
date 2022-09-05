const Page = require('../Page')

class PrsAppPurchaseNewConfirmation_03Page extends Page {
  get cancelsubmitbutton_button () { return $('APP-PURCHASE-CONFIRMATION > DIV > DIV:nth-of-type(3) > DIV.row > DIV.col-md-12 > #cancelSubmitButton') } 

  open() {
    return super.open('/prs/app/purchase/new/confirmation/6013fcbc-66f4-495e-97d7-2a103b9185f5') // update as needed
  }
} // end of class PrsAppPurchaseNewConfirmation_03Page

module.exports = new PrsAppPurchaseNewConfirmation_03Page();

