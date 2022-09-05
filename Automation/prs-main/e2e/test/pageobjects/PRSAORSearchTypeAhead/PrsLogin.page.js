const Page = require('./page')

class PrsLoginPage extends Page {
  get nusnetId_label () { return $('LABEL.col-sm-6.control-label.spa-label') } 
  get loginas_textInput () { return $('INPUT[type="text"][name="loginAs"]') } 
  get login_button () { return $('BUTTON[type="submit"]') } 

  open() {
    return super.open('/prs/login') // update as needed
  }
} // end of class PrsLoginPage

module.exports = new PrsLoginPage();

