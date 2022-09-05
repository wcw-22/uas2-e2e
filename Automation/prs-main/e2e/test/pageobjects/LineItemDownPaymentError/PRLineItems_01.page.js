const Page = require('../Page')

class PRLineItems_01Page extends Page {
  get nolabel_numberInput () { return $('INPUT[type="number"].form-separator') } 
  get supplier1_textInput () { return $('APP-FRAGMENT-LINEITEM-SUPPLIER > DIV.col-sm-3 > DIV.row.form-separator > DIV:nth-of-type(2) > NG-SELECT > DIV > DIV > DIV:nth-of-type(2) > INPUT[type="text"]') } 
  get sigmaAldrich_span () { return $('NG-DROPDOWN-PANEL > DIV.scroll-host > DIV:nth-of-type(2) > DIV:nth-of-type(6) > SPAN') } 

  open() {
    return super.open('/prs/app/purchase/new/items/85eaa5ab-3251-4dc4-bc25-d181105ce5da') // update as needed
  }
} // end of class PRLineItems_01Page

module.exports = new PRLineItems_01Page();

