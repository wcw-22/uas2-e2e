const Page = require('../Page')

class PrsAppPurchaseNewConfirmation_01Page extends Page {
  get confirmationMsg_div () { return $('DIV.alert.alert-success') } 
  get ok_button () { return $('APP-PURCHASE-CONFIRMATION > DIV > DIV:nth-of-type(3) > DIV.row > DIV.col-sm-12 > BUTTON[type="button"]') } 

  open() {
    return super.open('/prs/app/purchase/new/confirmation/a75c81e0-2444-43ff-9f95-3fd813316050') // update as needed
  }
} // end of class PrsAppPurchaseNewConfirmation_01Page

module.exports = new PrsAppPurchaseNewConfirmation_01Page();

