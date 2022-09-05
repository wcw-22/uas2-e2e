const Page = require('../Page')

class PrsAppPurchaseNewAccountAssignment_00_01_01Page extends Page {
  get invalidWBS_li () { return $('DIV.alert.alert-danger > UL > LI') } 
  get wbs_div () { return $('DIV:nth-of-type(5)') } 
  get wbs_textInput () { return $('#defaultWBS') } 
  get wbs_textInput () { return $('#defaultWBS') } 
  get nextbutton_button () { return $('#nextButton') } 

  open() {
    return super.open('/prs/app/purchase/new/account-assignment/ff3d89ae-f9f4-44bd-a137-aef222467732') // update as needed
  }
} // end of class PrsAppPurchaseNewAccountAssignment_00_01_01Page

module.exports = new PrsAppPurchaseNewAccountAssignment_00_01_01Page();

