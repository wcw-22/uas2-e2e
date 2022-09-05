const Page = require('../Page')

class PrsAppPurchaseNewAorConfirmation_02Page extends Page {
  get nolabel_div () { return $('DIV.alert.alert-success') } 
  get nolabel_span () { return $('DIV.alert.alert-success > APP-MESSAGE:nth-of-type(1) > SPAN') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/confirmation/12593d5b-9d0b-456e-b79f-921cfdc1acca') // update as needed
  }
} // end of class PrsAppPurchaseNewAorConfirmation_02Page

module.exports = new PrsAppPurchaseNewAorConfirmation_02Page();

