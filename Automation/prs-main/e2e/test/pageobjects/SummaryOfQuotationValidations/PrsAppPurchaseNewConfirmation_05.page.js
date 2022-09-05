const Page = require('../Page')

class PrsAppPurchaseNewConfirmation_05Page extends Page {
  get errorMsg_div () { return $('DIV.alert.alert-danger') } 

  open() {
    return super.open('/prs/app/purchase/new/confirmation/6013fcbc-66f4-495e-97d7-2a103b9185f5') // update as needed
  }
} // end of class PrsAppPurchaseNewConfirmation_05Page

module.exports = new PrsAppPurchaseNewConfirmation_05Page();

