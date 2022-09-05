const Page = require('../Page')

class PrsAppPurchaseNewItems_02Page extends Page {
  get errorMsg3_li () { return $('DIV.alert.alert-danger > UL > LI:nth-of-type(3)') } 
  get backbutton_button () { return $('APP-PURCHASE-ITEMS > DIV > DIV:nth-of-type(3) > DIV.row > DIV.col-md-12 > #backButton') } 

  open() {
    return super.open('/prs/app/purchase/new/items/8cae6024-664d-4199-be35-126e4f4d9b30') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_02Page

module.exports = new PrsAppPurchaseNewItems_02Page();

