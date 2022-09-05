const Page = require('../Page')

class PRConfirmationMsgPage extends Page {
  get msg_div () { return $('DIV.alert.alert-success') } 
  get msg_span () { return $('DIV.alert.alert-success > APP-MESSAGE:nth-of-type(1) > SPAN') } 
  get ok_button () { return $('APP-PURCHASE-CONFIRMATION > DIV > DIV:nth-of-type(3) > DIV.row > DIV.col-sm-12 > BUTTON[type="button"]') } 

  open() {
    return super.open('/prs/app/purchase/new/confirmation/cebc1fdb-630d-4f50-937c-bdc7df8a7d6d') // update as needed
  }
} // end of class PRConfirmationMsgPage

module.exports = new PRConfirmationMsgPage();

