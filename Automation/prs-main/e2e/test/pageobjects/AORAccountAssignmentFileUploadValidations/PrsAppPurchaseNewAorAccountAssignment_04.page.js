const Page = require('../Page')

class PrsAppPurchaseNewAorAccountAssignment_04Page extends Page {
  get fileIsInvalid_div () { return $('DIV.alert.alert-danger') } 
  get fileIsInvalid_li () {return $('DIV.alert.alert-danger > UL > LI')}
  open() {
    return super.open('/prs/app/purchase/new/aor/account-assignment/abcab0cb-cd52-4b27-9043-2efa535037b4') // update as needed
  }
} // end of class PrsAppPurchaseNewAorAccountAssignment_04Page

module.exports = new PrsAppPurchaseNewAorAccountAssignment_04Page();

