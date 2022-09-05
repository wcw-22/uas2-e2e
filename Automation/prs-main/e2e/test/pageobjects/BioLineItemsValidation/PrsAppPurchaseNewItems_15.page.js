const Page = require('../Page')

class PrsAppPurchaseNewItems_15Page extends Page {
  get errMsg_div () { return $('DIV.alert.alert-danger') } 
  get notationtypeScientificCoefBioConcentration0_textInput () { return $('DIV.input-group > INPUT:nth-of-type(1)') } 
  get productNumberAtccNumberAddgeneCatalogueNumber_textInput () { return $('DIV:nth-of-type(3) > DIV:nth-of-type(2) > INPUT[type="text"]') } 
  get nextbutton_button () { return $('#nextButton') } 

  open() {
    return super.open('/prs/app/purchase/new/items/5f264cc6-a749-4b02-802c-faa384de3228') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_15Page

module.exports = new PrsAppPurchaseNewItems_15Page();

