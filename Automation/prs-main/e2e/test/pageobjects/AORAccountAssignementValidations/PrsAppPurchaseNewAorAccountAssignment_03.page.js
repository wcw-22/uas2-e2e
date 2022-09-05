const Page = require('../Page')

class PrsAppPurchaseNewAorAccountAssignment_03Page extends Page {
  get nolabel_app_aor_account_assignment () { return $('APP-AOR-ACCOUNT-ASSIGNMENT') } 
  get epv_li () { return $('DIV.alert.alert-danger > UL > LI') } 
  get a00023220000_textInput () { return $('TD:nth-of-type(2) > INPUT') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/account-assignment/8c1c3556-0794-47af-97e3-099adb3e280e') // update as needed
  }
} // end of class PrsAppPurchaseNewAorAccountAssignment_03Page

module.exports = new PrsAppPurchaseNewAorAccountAssignment_03Page();

