const Page = require('../Page')

class PrsAppPurchaseNewAccountAssignment_04Page extends Page {
  get invalidWbs_li () { return $('DIV.alert.alert-danger > UL > LI') } 
  get wbs_textInput () { return $('#defaultWBS') } 
  get wbs_textInput () { return $('#defaultWBS') } 

  open() {
    return super.open('/prs/app/purchase/new/account-assignment/ff3d89ae-f9f4-44bd-a137-aef222467732') // update as needed
  }
} // end of class PrsAppPurchaseNewAccountAssignment_04Page

module.exports = new PrsAppPurchaseNewAccountAssignment_04Page();

