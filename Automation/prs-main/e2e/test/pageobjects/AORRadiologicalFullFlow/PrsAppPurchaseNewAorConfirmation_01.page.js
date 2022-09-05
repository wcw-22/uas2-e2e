const Page = require('../Page')

class PrsAppPurchaseNewAorConfirmation_01Page extends Page {
  get yes_span () { return $('#confirmSubmitButton') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/confirmation/12593d5b-9d0b-456e-b79f-921cfdc1acca') // update as needed
  }
} // end of class PrsAppPurchaseNewAorConfirmation_01Page

module.exports = new PrsAppPurchaseNewAorConfirmation_01Page();

