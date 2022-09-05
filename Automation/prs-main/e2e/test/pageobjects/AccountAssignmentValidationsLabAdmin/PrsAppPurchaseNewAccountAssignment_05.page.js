const Page = require('../Page')

class PrsAppPurchaseNewAccountAssignment_05Page extends Page {
  get wbs_textInput () { return $('#defaultWBS') } 
  get anatomy_p () { return $('DIV:nth-of-type(3) > P') } 
  get approver1_select () { return $('DIV.panel.panel-primary > DIV:nth-of-type(2) > DIV:nth-of-type(1) > DIV:nth-of-type(2) > SELECT') } 
  get approver2_select () { return $('DIV.panel.panel-primary > DIV:nth-of-type(2) > DIV:nth-of-type(2) > DIV:nth-of-type(2) > SELECT') } 
  // available 2 options: 'Please Select', 'Averie Jordan', 


  open() {
    return super.open('/prs/app/purchase/new/account-assignment/ff3d89ae-f9f4-44bd-a137-aef222467732') // update as needed
  }
} // end of class PrsAppPurchaseNewAccountAssignment_05Page

module.exports = new PrsAppPurchaseNewAccountAssignment_05Page();

