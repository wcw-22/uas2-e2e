const Page = require('./page')

class cart_html extends Page {
  get checkout_button () { return $('#checkout') } 

  open() {
    return super.open('/cart.html') // update as needed
  }
} // end of class cart_html

module.exports = new cart_html();

