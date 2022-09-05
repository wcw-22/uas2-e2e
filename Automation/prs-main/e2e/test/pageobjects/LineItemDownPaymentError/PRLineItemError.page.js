const Page = require('../Page')

class PRLineItemErrorPage extends Page {
  get errorMsg1_li () { return $('DIV.alert.alert-danger > UL > LI') } 

  open() {
    return super.open('/prs/app/purchase/new/items/85eaa5ab-3251-4dc4-bc25-d181105ce5da') // update as needed
  }
} // end of class PRLineItemErrorPage

module.exports = new PRLineItemErrorPage();

