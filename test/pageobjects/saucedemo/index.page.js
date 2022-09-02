const Page = require('./page')

class index extends Page {
  get userName_textInput () { return $('#user-name') } 
  get password_passwordInput () { return $('#password') } 
  get login_submitInput () { return $('#login-button') } 

  open() {
    return super.open('/') // update as needed
  }
} // end of class index

module.exports = new index();

