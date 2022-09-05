const Page = require('../Page')

class PrsAppPurchaseNewItems_10Page extends Page {
  get errorMsg_li () { return $('DIV.alert.alert-danger > UL > LI') } 
  get notationtypeRealInputBioConcentration0_textInput () { return $('DIV:nth-of-type(1) > INPUT[type="text"]') } 
  get productNumberAtccNumberAddgeneCatalogueNumber_textInput () { return $('DIV:nth-of-type(3) > DIV:nth-of-type(2) > INPUT[type="text"]') } 
  get nextbutton_button () { return $('#nextButton') } 
  get errorMsg_div () { return $('DIV.alert.alert-danger') } 
  open() {
    return super.open('/prs/app/purchase/new/items/5f264cc6-a749-4b02-802c-faa384de3228') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_10Page

module.exports = new PrsAppPurchaseNewItems_10Page();

