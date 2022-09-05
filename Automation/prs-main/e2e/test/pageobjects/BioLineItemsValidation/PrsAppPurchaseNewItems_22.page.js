const Page = require('../Page')

class PrsAppPurchaseNewItems_22Page extends Page {
  get errMsg_div () { return $('DIV.alert.alert-danger') } 
  get nolabel_li () { return $('DIV.alert.alert-danger > UL > LI') } 

  open() {
    return super.open('/prs/app/purchase/new/items/5f264cc6-a749-4b02-802c-faa384de3228') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_22Page

module.exports = new PrsAppPurchaseNewItems_22Page();

