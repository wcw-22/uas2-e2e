const Page = require('./page')

class checkout_step_one_html extends Page {
  get firstname_textInput () { return $('#first-name') } 
  get lastname_textInput () { return $('#last-name') } 
  get postalcode_textInput () { return $('#postal-code') } 
  get continue_submitInput () { return $('#continue') } 

  open() {
    return super.open('/checkout-step-one.html') // update as needed
  }
} // end of class checkout_step_one_html

module.exports = new checkout_step_one_html();

