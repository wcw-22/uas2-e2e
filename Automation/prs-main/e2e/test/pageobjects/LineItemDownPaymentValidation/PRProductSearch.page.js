const Page = require('../Page')

class PRProductSearchPage extends Page {
  get product_radioInput () { return $('LABEL:nth-of-type(3) > INPUT[type="radio"][name="displayOption"]') } 
  get chemicalName_textInput () { return $('#chemicalName') } 

  open() {
    return super.open('/prs/app/purchase/new/search/aa1e164e-cc79-414a-b0ec-498ce8affe6c') // update as needed
  }
} // end of class PRProductSearchPage

module.exports = new PRProductSearchPage();

