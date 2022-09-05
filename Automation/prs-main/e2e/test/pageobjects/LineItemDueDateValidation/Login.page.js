const Page = require('../Page')

class LoginPage extends Page {
  get loginas_textInput () { return $('INPUT[type="text"][name="loginAs"]') } 
  get login_button () { return $('BUTTON[type="submit"]') } 

  open() {
    return super.open('/prs/login') // update as needed
  }
} // end of class LoginPage

module.exports = new LoginPage();

