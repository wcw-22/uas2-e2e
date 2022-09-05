const Page = require('../Page')

class PrsAppPurchaseNewItems_27Page extends Page {
  get errMsg_div () { return $('DIV.alert.alert-danger') } 
  get errMsg_li () { return $('DIV.alert.alert-danger > UL > LI') } 
  get saveasdraftbutton_button () { return $('#saveAsDraftButton') } 

  open() {
    return super.open('/prs/app/purchase/new/items/5f264cc6-a749-4b02-802c-faa384de3228') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_27Page

module.exports = new PrsAppPurchaseNewItems_27Page();

