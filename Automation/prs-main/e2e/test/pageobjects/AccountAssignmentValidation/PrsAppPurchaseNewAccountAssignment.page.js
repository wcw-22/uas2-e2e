const Page = require('../Page')

class PrsAppPurchaseNewAccountAssignmentPage extends Page {
  get storageLocation_select () { return $('#location') } 
  // available 3 options: 'Please Select', 'MD10 > 02 > 02 > BAY BH LAB', 'MD10 > 03 > 01 > BAY BH LAB', 
  get inventoryOwner_select () { return $('#inventoryOwner') }
  get wbs_textInput () { return $('#defaultWBS') } 
  get add1_1_button () { return $('TR:nth-of-type(2) > TD:nth-of-type(7) > BUTTON[type="button"]') } 

  open() {
    return super.open('/prs/app/purchase/new/account-assignment/8d031f98-d519-41bb-837d-06ffbe13e5f1') // update as needed
  }
} // end of class PrsAppPurchaseNewAccountAssignmentPage

module.exports = new PrsAppPurchaseNewAccountAssignmentPage();

