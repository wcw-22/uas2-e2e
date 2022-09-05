const Page = require('../Page')

class PrsAppPurchaseNewAorAccountAssignment_06Page extends Page {
  get next_span () { return $('#nextButton > APP-MESSAGE > SPAN') } 
  get nolabel_i () { return $('DIV > TABLE > TBODY > TR > TD:nth-of-type(2) > BUTTON.btn-link > I.glyphicon.glyphicon-trash') } 
  get nolabel_li () { return $('DIV.alert.alert-danger > UL > LI') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/account-assignment/12593d5b-9d0b-456e-b79f-921cfdc1acca') // update as needed
  }
} // end of class PrsAppPurchaseNewAorAccountAssignment_06Page

module.exports = new PrsAppPurchaseNewAorAccountAssignment_06Page();

