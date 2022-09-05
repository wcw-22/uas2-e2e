const Page = require('../Page')

class PRLineItemsPage extends Page {
  get downpayment_checkboxInput () { return $('#downpaymentCategory') } 
  get price0_textInput () { return $('DIV:nth-of-type(2) > INPUT[type="text"].line-item-min-width') } 
  get quantity_textInput () { return $('DIV:nth-of-type(4) > INPUT[type="text"].line-item-min-width') } 
  get unit_select () { return $('DIV:nth-of-type(6) > SELECT') } 
  // available 3 options: 'Please Select', 'Ea', 'Box', 


  open() {
    return super.open('/prs/app/purchase/new/items/bd7ff4dd-1b6e-4ccc-a814-1bc263149957') // update as needed
  }
} // end of class PRLineItemsPage

module.exports = new PRLineItemsPage();

