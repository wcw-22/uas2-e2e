const Page = require('../Page')

class PrsAppPurchaseNewItems_04Page extends Page {
  get errorMsg1_li () { return $('DIV.alert.alert-danger > UL > LI') } 
  get supplier2_textInput () { return $('APP-FRAGMENT-LINEITEM-RADIOACTIVE-PRODUCT-FORM > DIV:nth-of-type(2) > APP-FRAGMENT-LINEITEM-SUPPLIER > DIV.col-sm-3 > DIV.row.form-separator > DIV:nth-of-type(2) > NG-SELECT > DIV > DIV > DIV:nth-of-type(3) > INPUT[type="text"]') } 

  open() {
    return super.open('/prs/app/purchase/new/items/a75c81e0-2444-43ff-9f95-3fd813316050') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_04Page

module.exports = new PrsAppPurchaseNewItems_04Page();

