const Page = require('../Page')

class PrsAppPurchaseNewAccountAssignmentPage extends Page {
  get storageLocation_select () { return $('#location') } 
  get inventoryOwner_select () { return $('#inventoryOwner') }
  // available 3 options: 'Please Select', 'MD10 > 02 > 02 > BAY BH LAB', 'MD10 > 03 > 01 > BAY BH LAB', 

  get wbs_textInput () { return $('#defaultWBS') } 

  open() {
    return super.open('/prs/app/purchase/new/account-assignment/a75c81e0-2444-43ff-9f95-3fd813316050') // update as needed
  }
} // end of class PrsAppPurchaseNewAccountAssignmentPage

module.exports = new PrsAppPurchaseNewAccountAssignmentPage();

