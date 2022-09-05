const Page = require('../Page')

class PrsAppPurchaseNewItems_03Page extends Page {
  get price0_textInput () { return $('APP-FRAGMENT-LINEITEM-BIOLOGICAL-PRODUCT-FORM > APP-FRAGMENT-LINEITEM-SUBTOTAL > DIV:nth-of-type(1) > DIV:nth-of-type(2) > INPUT[type="text"].line-item-min-width') } 
  get quantity_textInput () { return $('DIV:nth-of-type(4) > INPUT[type="text"].line-item-min-width') } 
  get unit_select () { return $('DIV:nth-of-type(6) > SELECT') } 
  // available 3 options: 'Please Select', 'Ea', 'Box', 

  get nextbutton_button () { return $('#nextButton') } 

  open() {
    return super.open('/prs/app/purchase/new/items/5f264cc6-a749-4b02-802c-faa384de3228') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_03Page

module.exports = new PrsAppPurchaseNewItems_03Page();

