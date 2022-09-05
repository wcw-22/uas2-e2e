const Page = require('../Page')

class PrsAppPurchaseNewAorItemsPage extends Page {
  get physicalForm_select () { return $('DIV:nth-of-type(2) > SELECT') } 
  // available 4 options: 'Please Select', 'Gas', 'Liquid', 'Solid', 

  get totalQuantity_div () { return $('DIV:nth-of-type(2) > DIV.row.form-separator > DIV:nth-of-type(1)') } 
  get qty_numberInput () { return $('INPUT[type="number"]') } 
  get unit_select () { return $('DIV:nth-of-type(3) > SELECT') } 
  // available 1 options: 'Please Select', 

  get next_button () { return $('BUTTON:nth-of-type(3)') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/items/73834a33-c80d-458b-a31b-a656408d6ee1') // update as needed
  }
} // end of class PrsAppPurchaseNewAorItemsPage

module.exports = new PrsAppPurchaseNewAorItemsPage();

