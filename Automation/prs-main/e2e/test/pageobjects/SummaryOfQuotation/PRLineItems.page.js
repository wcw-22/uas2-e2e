const Page = require('../Page')

class PRLineItemsPage extends Page {
  get item1_div () { return $('DIV.form-horizontal > DIV:nth-of-type(1)') } 
  get supplier1_textInput () { return $('APP-FRAGMENT-LINEITEM-CHEMICAL-PRODUCT-FORM > DIV:nth-of-type(2) > APP-FRAGMENT-LINEITEM-SUPPLIER > DIV.col-sm-3 > DIV.row.form-separator > DIV:nth-of-type(2) > NG-SELECT > DIV > DIV > DIV:nth-of-type(2) > INPUT[type="text"]') } 
  get item2_div () { return $('DIV.form-horizontal > DIV:nth-of-type(2)') } 

  open() {
    return super.open('/prs/app/purchase/new/items/94d5375c-e910-4953-8a27-a28feefef2e0') // update as needed
  }
} // end of class PRLineItemsPage

module.exports = new PRLineItemsPage();

