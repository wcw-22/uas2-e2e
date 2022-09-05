const Page = require('../Page')

class PrsAppPurchaseNewItems_09Page extends Page {
  get epvValueExceeded_li () { return $('DIV.alert.alert-danger > UL > LI') } 
  get quantity_textInput () { return $('APP-FRAGMENT-LINEITEM-BIOLOGICAL-PRODUCT-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(4) > INPUT[type="text"].line-item-min-width') } 
  get nextbutton_button () { return $('#nextButton') } 

  open() {
    return super.open('/prs/app/purchase/new/items/6013fcbc-66f4-495e-97d7-2a103b9185f5') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_09Page

module.exports = new PrsAppPurchaseNewItems_09Page();

