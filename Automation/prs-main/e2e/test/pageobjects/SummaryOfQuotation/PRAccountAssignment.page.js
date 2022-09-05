const Page = require('../Page')

class PRAccountAssignmentPage extends Page {
  get accountAssignment_div () { return $('APP-PURCHASE-ACCOUNT-ASSIGNMENT > DIV > DIV:nth-of-type(1) > DIV.col-md-12') } 
  get storageLocation_select () { return $('#location') } 
  get inventoryOwner_select () { return $('#inventoryOwner') }
  // available 3 options: 'Please Select', 'MD10 > 02 > 02 > BAY BH LAB', 'MD10 > 03 > 01 > BAY BH LAB', 

  get wbs_textInput () { return $('#defaultWBS') } 

  open() {
    return super.open('/prs/app/purchase/new/account-assignment/94d5375c-e910-4953-8a27-a28feefef2e0') // update as needed
  }
} // end of class PRAccountAssignmentPage

module.exports = new PRAccountAssignmentPage();

