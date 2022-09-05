const Page = require('../Page')

class PrsAppPurchaseNewItems_03Page extends Page {
  get errMsg1_li () { return $('DIV.alert.alert-danger > UL > LI') } 
  get removelineitembutton0_button () { return $('DIV > APP-FRAGMENT-LINEITEM-CHEMICAL-CATALOG-FORM > DIV:nth-of-type(1) > DIV.col-sm-12.text-right > BUTTON[type="button"]') } 

  open() {
    return super.open('/prs/app/purchase/new/items/6013fcbc-66f4-495e-97d7-2a103b9185f5') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_03Page

module.exports = new PrsAppPurchaseNewItems_03Page();

