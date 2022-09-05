const Page = require('../Page')

class PRProductSearchResult2Page extends Page {
  get add_button () { return $('TD:nth-of-type(4) > BUTTON[type="button"]') } 
  get next_button () { return $('APP-PURCHASE-SEARCH > DIV > DIV:nth-of-type(2) > DIV.text-right > DIV.row > DIV.col-md-12 > BUTTON:nth-of-type(2)') } 

  open() {
    return super.open('/prs/app/purchase/new/search/85eaa5ab-3251-4dc4-bc25-d181105ce5da') // update as needed
  }
} // end of class PRProductSearchResult2Page

module.exports = new PRProductSearchResult2Page();

