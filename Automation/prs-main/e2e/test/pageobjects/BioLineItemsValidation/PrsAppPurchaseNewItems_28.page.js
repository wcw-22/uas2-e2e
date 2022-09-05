const Page = require('../Page')

class PrsAppPurchaseNewItems_28Page extends Page {
  get errMsg_div () { return $('DIV.alert.alert-danger') } 
  get nolabel_li () { return $('DIV.alert.alert-success > UL > LI:nth-of-type(1)') } 
  get additionalCharge1_text () { return $('TEXTAREA') } 
  get nextbutton_button () { return $('#nextButton') } 

  open() {
    return super.open('/prs/app/purchase/new/items/5f264cc6-a749-4b02-802c-faa384de3228') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_28Page

module.exports = new PrsAppPurchaseNewItems_28Page();

