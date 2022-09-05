const Page = require('../Page')

class PrsAppPurchaseNewAccountAssignmentPage extends Page {
  get storageLocation_select () { return $('#location') } 
  get inventoryOwner_select () { return $('#inventoryOwner') }
  // available 3 options: 'Please Select', 'MD10 > 02 > 02 > BAY BH LAB', 'MD10 > 03 > 01 > BAY BH LAB', 

  get wbs_textInput () { return $('#defaultWBS') } 
  get splititemassignmentbutton00_button () { return $('TD:nth-of-type(7) > BUTTON[type="button"]') } 

  open() {
    return super.open('/prs/app/purchase/new/account-assignment/6013fcbc-66f4-495e-97d7-2a103b9185f5') // update as needed
  }
} // end of class PrsAppPurchaseNewAccountAssignmentPage

module.exports = new PrsAppPurchaseNewAccountAssignmentPage();

