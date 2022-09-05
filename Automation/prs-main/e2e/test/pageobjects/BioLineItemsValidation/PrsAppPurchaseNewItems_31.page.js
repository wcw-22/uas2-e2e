const Page = require('../Page')

class PrsAppPurchaseNewItems_31Page extends Page {
  get errMsg_div () { return $('DIV.alert.alert-danger') } 
  get nolabel_ul () { return $('DIV.alert.alert-danger > UL') } 

  open() {
    return super.open('/prs/app/purchase/new/items/5f264cc6-a749-4b02-802c-faa384de3228') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_31Page

module.exports = new PrsAppPurchaseNewItems_31Page();

