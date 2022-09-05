const Page = require('../Page')

class PrsAppPurchaseNewSearch_01Page extends Page {
  get nolabel_div () { return $('APP-PURCHASE-SEARCH-CHEMICAL > FORM.form-horizontal > DIV:nth-of-type(3) > DIV:nth-of-type(2)') } 
  get chemicalName_textInput () { return $('#chemicalName') } 
  get chemicalsearchbutton_button () { return $('#chemicalSearchButton') } 
  get addnewlineitem0_button () { return $('TR:nth-of-type(1) > TD:nth-of-type(4) > BUTTON[type="button"]') } 

  open() {
    return super.open('/prs/app/purchase/new/search/8cae6024-664d-4199-be35-126e4f4d9b30') // update as needed
  }
} // end of class PrsAppPurchaseNewSearch_01Page

module.exports = new PrsAppPurchaseNewSearch_01Page();

