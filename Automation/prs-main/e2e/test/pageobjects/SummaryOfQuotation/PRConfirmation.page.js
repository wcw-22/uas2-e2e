const Page = require('../Page')

class PRConfirmationPage extends Page {
  get nolabel_div () { return $('APP-PURCHASE-CONFIRMATION > DIV') } 
  get yes_button () { return $('DIV.col-md-12 > BUTTON:nth-of-type(1)') } 

  open() {
    return super.open('/prs/app/purchase/new/confirmation/cebc1fdb-630d-4f50-937c-bdc7df8a7d6d') // update as needed
  }
} // end of class PRConfirmationPage

module.exports = new PRConfirmationPage();

