const Page = require('../Page')

class PrsAppPurchaseNewAorAccountAssignment_02Page extends Page {
  get nolabel_tr () { return $('DIV:nth-of-type(6) > DIV.col-md-12 > DIV.panel.panel-primary > DIV:nth-of-type(2) > DIV > TABLE > TBODY > TR') } 
  get aaWbs0_textInput () { return $('TD:nth-of-type(2) > INPUT') } 
  get aaLimit0_numberInput () { return $('INPUT[type="number"]') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/account-assignment/abcab0cb-cd52-4b27-9043-2efa535037b4') // update as needed
  }
} // end of class PrsAppPurchaseNewAorAccountAssignment_02Page

module.exports = new PrsAppPurchaseNewAorAccountAssignment_02Page();

