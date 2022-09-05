const Page = require('../Page')

class PrsAppPurchaseNewItems_04Page extends Page {
  get nolabel_ul () { return $('DIV.alert.alert-danger > UL') } 
  get errorMsg1_li () { return $('DIV.alert.alert-danger > UL > LI:nth-of-type(1)') } 
  get errorMsg2_li () { return $('DIV.alert.alert-danger > UL > LI:nth-of-type(2)') } 
  get _1100_span () { return $('DIV:nth-of-type(1) > APP-FRAGMENT-LINEITEM-CHEMICAL-CATALOG-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(7) > SPAN') } 
  get quantity1_textInput () { return $('DIV:nth-of-type(1) > APP-FRAGMENT-LINEITEM-CHEMICAL-CATALOG-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(4) > INPUT[type="text"].line-item-min-width') } 
  get menulogout_link () { return $('#menuLogout') } 
  open() {
    return super.open('/prs/app/purchase/new/items/8cae6024-664d-4199-be35-126e4f4d9b30') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_04Page

module.exports = new PrsAppPurchaseNewItems_04Page();

