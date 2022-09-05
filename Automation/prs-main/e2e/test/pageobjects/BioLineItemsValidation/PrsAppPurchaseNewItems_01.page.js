const Page = require('../Page')

class PrsAppPurchaseNewItems_01Page extends Page {
  get errorMsg_div () { return $('DIV.alert.alert-danger') } 
  get nolabel_ul () { return $('DIV.alert.alert-danger > UL') } 
  get nolabel_div () { return $('APP-FRAGMENT-LINEITEM-SUPPLIER > DIV.col-sm-3 > DIV.row.form-separator > DIV:nth-of-type(2) > NG-SELECT > DIV') } 
  get lineitemsupplier0_textInput () { return $('NG-SELECT > DIV > DIV > DIV:nth-of-type(2) > INPUT[type="text"]') } 

  open() {
    return super.open('/prs/app/purchase/new/items/5f264cc6-a749-4b02-802c-faa384de3228') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_01Page

module.exports = new PrsAppPurchaseNewItems_01Page();

