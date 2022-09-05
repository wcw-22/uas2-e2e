const Page = require('../Page')

class PRProductSearchResult_01Page extends Page {
  get add_button () { return $('TR:nth-of-type(1) > TD:nth-of-type(3) > BUTTON[type="button"]') } 
  get next_button () { return $('APP-PURCHASE-SEARCH > DIV > DIV:nth-of-type(2) > DIV.text-right > DIV.row > DIV.col-md-12 > BUTTON:nth-of-type(2)') } 

  open() {
    return super.open('/prs/app/purchase/new/search/94d5375c-e910-4953-8a27-a28feefef2e0') // update as needed
  }
} // end of class PRProductSearchResult_01Page

module.exports = new PRProductSearchResult_01Page();

