const Page = require('../Page')

class PrsAppPurchaseNewAccountAssignment_00_03Page extends Page {
  get invalidWBS_li () { return $('DIV.alert.alert-danger > UL > LI') } 
  get wbs_div () { return $('DIV:nth-of-type(5)') } 
  get wbs_textInput () { return $('#defaultWBS') } 
  get wbs_textInput () { return $('#defaultWBS') } 
  get anatomy_p () { return $('DIV:nth-of-type(3) > P') } 
  get approver1_select () { return $('DIV.panel.panel-primary > DIV:nth-of-type(2) > DIV:nth-of-type(1) > DIV:nth-of-type(2) > SELECT') } 
  get approver2_select () { return $('DIV.panel.panel-primary > DIV:nth-of-type(2) > DIV:nth-of-type(2) > DIV:nth-of-type(2) > SELECT') } 
  // available 2 options: 'Please Select', 'Averie Jordan', 
  get nextbutton_button () { return $('#nextButton') } 

  open() {
    return super.open('/prs/app/purchase/new/account-assignment/ff3d89ae-f9f4-44bd-a137-aef222467732') // update as needed
  }
} // end of class PrsAppPurchaseNewAccountAssignment_00_03Page

module.exports = new PrsAppPurchaseNewAccountAssignment_00_03Page();

