const Page = require('./page')

class inventory_html extends Page {
  get nolabel_link () { return $('A.shopping_cart_link') } 
  get addToCartSauceLabsBackpack_button () { return $('#add-to-cart-sauce-labs-backpack') } 

  open() {
    return super.open('/inventory.html') // update as needed
  }
} // end of class inventory_html

module.exports = new inventory_html();

