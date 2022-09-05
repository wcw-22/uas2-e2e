const Page = require('../Page')

class PRAccountAssignmentPage extends Page {
  get accountAssignment_div () { return $('APP-PURCHASE-ACCOUNT-ASSIGNMENT > DIV > DIV:nth-of-type(1) > DIV.col-md-12') } 
  get menulogout_link () { return $('#menuLogout') } 
  open() {
    return super.open('/prs/app/purchase/new/account-assignment/bd7ff4dd-1b6e-4ccc-a814-1bc263149957') // update as needed
  }
} // end of class PRAccountAssignmentPage

module.exports = new PRAccountAssignmentPage();

