const Page = require('../Page')

class PrsAppPurchaseNewAorItemsPage extends Page {
  get physicalForm_select () { return $('DIV:nth-of-type(2) > SELECT') } 
  // available 4 options: 'Please Select', 'Gas', 'Liquid', 'Solid', 

  get totalQuantity_numberInput () { return $('INPUT[type="number"]') } 
  get chemicalquantityunit0_select () { return $('DIV:nth-of-type(3) > SELECT') } 
  // available 1 options: 'Please Select', 

  get next_span () { return $('#nextButton > APP-MESSAGE > SPAN') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/items/34597029-ceea-4f83-a2e8-2f8a33d26fff') // update as needed
  }
} // end of class PrsAppPurchaseNewAorItemsPage

module.exports = new PrsAppPurchaseNewAorItemsPage();

