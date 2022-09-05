const Page = require('../Page')

class PrsAppPurchaseNewItems_18Page extends Page {
  get errMsg_div () { return $('DIV.alert.alert-danger') } 
  get nolabel_li () { return $('DIV.alert.alert-danger > UL > LI') } 
  get originalquantitycode0_select () { return $('DIV:nth-of-type(3) > SELECT') } 
  // available 14 options: 'Please Select', 'EA', 'IU', 'NU', 'CU', 'g', 'mg', 'µg', 'ng', 'l', 'ml', 'µl', 'ccm', 'cm', 

  get unit_select () { return $('DIV:nth-of-type(6) > SELECT') } 
  // available 3 options: 'Please Select', 'Ea', 'Box', 


  open() {
    return super.open('/prs/app/purchase/new/items/5f264cc6-a749-4b02-802c-faa384de3228') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_18Page

module.exports = new PrsAppPurchaseNewItems_18Page();

