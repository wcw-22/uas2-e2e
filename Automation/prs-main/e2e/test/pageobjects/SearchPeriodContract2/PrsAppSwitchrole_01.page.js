const Page = require('../Page')

class PrsAppSwitchrole_01Page extends Page {
  get selectRole1_textInput () { return $('#select-role-1') } 

  open() {
    return super.open('/prs/app/switchRole') // update as needed
  }
} // end of class PrsAppSwitchrole_01Page

module.exports = new PrsAppSwitchrole_01Page();

