const Page = require('../Page')

class PRProductSearchResultPage extends Page {
  get add_button () { return $('TR:nth-of-type(1) > TD:nth-of-type(4) > BUTTON[type="button"]') } 
  get next_button () { return $('APP-PURCHASE-SEARCH > DIV > DIV:nth-of-type(2) > DIV.text-right > DIV.row > DIV.col-md-12 > BUTTON:nth-of-type(2)') } 

  open() {
    return super.open('/prs/app/purchase/new/search/aa1e164e-cc79-414a-b0ec-498ce8affe6c') // update as needed
  }
} // end of class PRProductSearchResultPage

module.exports = new PRProductSearchResultPage();

