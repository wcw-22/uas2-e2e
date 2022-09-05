const Page = require('../Page')

class PrsAppPurchaseNewAccountAssignmentPage extends Page {
  get storageLocation_select () { return $('#location') } 
  get inventoryOwner_select () { return $('#inventoryOwner') }
  // available 3 options: 'Please Select', 'MD10 > 02 > 02 > BAY BH LAB', 'MD10 > 03 > 01 > BAY BH LAB', 

  get inventoryOwner_select () { return $('#inventoryOwner') } 
  // available 1 options: 'Please Select', 

  get backbutton_button () { return $('APP-PURCHASE-ACCOUNT-ASSIGNMENT > DIV > DIV:nth-of-type(3) > DIV.row > DIV.col-md-12 > #backButton') } 

  get wbs_textInput () { return $('#defaultWBS') } 

  open() {
    return super.open('/prs/app/purchase/new/account-assignment/ff3d89ae-f9f4-44bd-a137-aef222467732') // update as needed
  }
} // end of class PrsAppPurchaseNewAccountAssignmentPage

module.exports = new PrsAppPurchaseNewAccountAssignmentPage();

