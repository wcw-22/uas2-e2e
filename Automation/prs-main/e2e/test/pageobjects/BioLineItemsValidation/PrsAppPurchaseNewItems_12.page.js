const Page = require('../Page')

class PrsAppPurchaseNewItems_12Page extends Page {
  get errorMsg_div () { return $('DIV.alert.alert-danger') } 
  get nolabel_li () { return $('DIV.alert.alert-danger > UL > LI') } 
  get notationtypeRealInputBioConcentration0_textInput () { return $('DIV:nth-of-type(1) > INPUT[type="text"]') } 
  get nextbutton_button () { return $('#nextButton') } 

  open() {
    return super.open('/prs/app/purchase/new/items/5f264cc6-a749-4b02-802c-faa384de3228') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_12Page

module.exports = new PrsAppPurchaseNewItems_12Page();

