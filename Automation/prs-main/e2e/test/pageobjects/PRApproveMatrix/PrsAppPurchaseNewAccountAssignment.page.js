const Page = require('../Page')

class PrsAppPurchaseNewAccountAssignmentPage extends Page {
  get glAccount_select () { return $('#defaultGLAccount') }
  
  get storageLocation_select () { return $('#location') } 
  // available 1 options: 'Please Select', 

  get inventoryOwner_select () { return $('#inventoryOwner') } 
  // available 1 options: 'Please Select', 
  
  get error_info () { return $('DIV.alert.alert-danger > UL > LI') }

  get wbs_textInput () { return $('#defaultWBS') } 
  get nolabel_button () { return $('TD:nth-of-type(7) > BUTTON[type="button"]') } 
  get remove_wbs1_button() { return $('TR > TD:nth-of-type(3) > DIV > BUTTON[type="button"]') }
  get wbs1_textInput () { return $('INPUT[type="text"].wbs-input') } 
  get wbs2_textInput () { return $('TR:nth-of-type(3) > TD:nth-of-type(2) > INPUT[type="text"].wbs-input') } 
  get approver1_label () { return $('DIV:nth-of-type(2) > DIV:nth-of-type(1) > DIV:nth-of-type(2) > P') }
  get approver1_select () { return $('DIV.panel.panel-primary > DIV:nth-of-type(2) > DIV.row > DIV:nth-of-type(2) > SELECT') }
  get approver2_select () { return $('DIV.panel.panel-primary > DIV:nth-of-type(2) > DIV:nth-of-type(2) > DIV:nth-of-type(2) > SELECT') }

  open() {
    return super.open('/prs/app/purchase/new/account-assignment/6c267d15-71e9-4c1c-9ad9-264002974baf') // update as needed
  }
} // end of class PrsAppPurchaseNewAccountAssignmentPage

module.exports = new PrsAppPurchaseNewAccountAssignmentPage();

