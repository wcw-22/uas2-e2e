const Page = require('../Page')

class PrsLoginPage extends Page {
  get loginAsInput () { return $('INPUT[type="text"][name="loginAs"]') }
  get loginButton () { return $('BUTTON[type="submit"]') }

  open() {
    return super.open('/prs/login') // update as needed
  }
} // end of class PrsLoginPage

module.exports = new PrsLoginPage();

