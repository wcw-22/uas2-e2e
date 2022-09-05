const Page = require('../Page')

class PrsAppPurchaseNewAccountAssignment_02Page extends Page {
  get storageLocation_select () { return $('#location') } 
  // available 2 options: 'Please Select', 'MD10 > 02 > 02 > BAY BH LAB', 

  get wbs_textInput () { return $('#defaultWBS') } 
  get wbs_textInput () { return $('#defaultWBS') } 
  get inventoryOwner_select () { return $('#inventoryOwner') } 

  open() {
    return super.open('/prs/app/purchase/new/account-assignment/ff3d89ae-f9f4-44bd-a137-aef222467732') // update as needed
  }
} // end of class PrsAppPurchaseNewAccountAssignment_02Page

module.exports = new PrsAppPurchaseNewAccountAssignment_02Page();

