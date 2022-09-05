const Page = require('../Page')

class PrsAppPurchaseNewItems_08Page extends Page {
  get epvValueExceeded_li () { return $('DIV.alert.alert-danger > UL > LI') } 
  get nolabel_div () { return $('DIV.form-horizontal') } 
  get quantityperunit2_numberInput () { return $('DIV:nth-of-type(4) > INPUT[type="number"]') } 
  get nextbutton_button () { return $('#nextButton') } 

  open() {
    return super.open('/prs/app/purchase/new/items/ff3d89ae-f9f4-44bd-a137-aef222467732') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_08Page

module.exports = new PrsAppPurchaseNewItems_08Page();

