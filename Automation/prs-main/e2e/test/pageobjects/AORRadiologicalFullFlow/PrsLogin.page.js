const Page = require('../Page')

class PrsLoginPage extends Page {
  get contentContainer_div () { return $('#content-container') } 
  get loginas_textInput () { return $('INPUT[type="text"][name="loginAs"]') } 
  get login_button () { return $('BUTTON[type="submit"]') } 

  open() {
    return super.open('/prs/login') // update as needed
  }
} // end of class PrsLoginPage

module.exports = new PrsLoginPage();

