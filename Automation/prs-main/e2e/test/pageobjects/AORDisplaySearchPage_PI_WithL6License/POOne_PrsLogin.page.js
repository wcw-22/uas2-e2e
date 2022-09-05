const Page = require('./page')

class POOne_PrsLoginPage extends Page {
  get nusnetIdLogin_div () { return $('#content-container > DIV > DIV:nth-of-type(2)') } 
  get loginas_textInput () { return $('INPUT[type="text"][name="loginAs"]') } 
  get login_button () { return $('BUTTON[type="submit"]') } 

  open() {
    return super.open('/prs/login') // update as needed
  }
} // end of class POOne_PrsLoginPage

module.exports = new POOne_PrsLoginPage();

