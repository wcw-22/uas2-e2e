const Page = require('../Page')

class PrsAppPurchaseNewAccountAssignmentPage extends Page {
  get storageLocation_select () { return $('#location') } 
  get menulogout_link () { return $('#menuLogout') } 
  // available 1 options: 'Please Select', 


  open() {
    return super.open('/prs/app/purchase/new/account-assignment/69f4633a-fadd-474e-9e27-363a4beea0de') // update as needed
  }
} // end of class PrsAppPurchaseNewAccountAssignmentPage

module.exports = new PrsAppPurchaseNewAccountAssignmentPage();

