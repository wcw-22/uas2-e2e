const Page = require('../Page')

class PrsAppSwitchrolePage extends Page {
  role(idx) { return $('#select-role-' + idx) }

  open() {
    return super.open('/prs/app/switchRole') // update as needed
  }
} // end of class PrsAppSwitchrolePage

module.exports = new PrsAppSwitchrolePage();

