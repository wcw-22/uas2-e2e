const Page = require('../Page')

class PrsAppPurchaseNewItemsPage extends Page {
  get lineitemsupplier0_textInput () { return $('DIV > DIV > DIV:nth-of-type(2) > INPUT[type="text"]') } 
  get price0_textInput () { return $('DIV:nth-of-type(2) > INPUT[type="text"].line-item-min-width') } 
  get quantity_textInput () { return $('DIV:nth-of-type(4) > INPUT[type="text"].line-item-min-width') } 
  get unit_select () { return $('DIV:nth-of-type(6) > SELECT') } 
  // available 3 options: 'Please Select', 'Ea', 'Box', 


  open() {
    return super.open('/prs/app/purchase/new/items/69f4633a-fadd-474e-9e27-363a4beea0de') // update as needed
  }
} // end of class PrsAppPurchaseNewItemsPage

module.exports = new PrsAppPurchaseNewItemsPage();

