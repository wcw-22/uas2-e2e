const Page = require('../Page')

class PrsAppPurchaseNewItems_01Page extends Page {
  get nolabel_ul () { return $('DIV.alert.alert-danger > UL') } 
  get errorMsg1_li () { return $('DIV.alert.alert-danger > UL > LI:nth-of-type(1)') } 
  get quantity_textInput () { return $('DIV:nth-of-type(2) > APP-FRAGMENT-LINEITEM-CHEMICAL-CATALOG-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(4) > INPUT[type="text"].line-item-min-width') } 
  get nextbutton_button () { return $('#nextButton') } 

  open() {
    return super.open('/prs/app/purchase/new/items/8cae6024-664d-4199-be35-126e4f4d9b30') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_01Page

module.exports = new PrsAppPurchaseNewItems_01Page();

