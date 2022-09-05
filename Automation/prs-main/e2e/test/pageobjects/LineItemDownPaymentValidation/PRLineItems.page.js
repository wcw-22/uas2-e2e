const Page = require('../Page')

class PRLineItemsPage extends Page {
  get downpayment_checkboxInput () { return $('#downpaymentCategory') } 
  get supplier1_textInput () { return $('DIV > DIV > DIV:nth-of-type(2) > INPUT[type="text"]') } 

  open() {
    return super.open('/prs/app/purchase/new/items/aa1e164e-cc79-414a-b0ec-498ce8affe6c') // update as needed
  }
} // end of class PRLineItemsPage

module.exports = new PRLineItemsPage();

