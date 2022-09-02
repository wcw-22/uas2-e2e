const Page = require('./page')

class checkout_step_two_html extends Page {
  get finish_button () { return $('#finish') } 

  open() {
    return super.open('/checkout-step-two.html') // update as needed
  }
} // end of class checkout_step_two_html

module.exports = new checkout_step_two_html();

