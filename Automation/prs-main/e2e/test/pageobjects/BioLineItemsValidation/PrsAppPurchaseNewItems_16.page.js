const Page = require('../Page')

class PrsAppPurchaseNewItems_16Page extends Page {
  get errMsg_div () { return $('DIV.alert.alert-danger') } 
  get packagingSize_numberInput () { return $('INPUT[type="number"]') } 
  get x10_div () { return $('DIV.input-group') } 
  get notationtypeScientificCoefBioConcentration0_textInput () { return $('DIV.input-group > INPUT:nth-of-type(1)') } 
  get notationtypeScientificExponentBioConcentration0_textInput () { return $('INPUT:nth-of-type(2)') } 
  get manufacturer0_textInput () { return $('DIV:nth-of-type(2) > DIV:nth-of-type(2) > NG-SELECT > DIV > DIV > DIV:nth-of-type(3) > INPUT[type="text"]') } 
  get nextbutton_button () { return $('#nextButton') } 

  open() {
    return super.open('/prs/app/purchase/new/items/5f264cc6-a749-4b02-802c-faa384de3228') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_16Page

module.exports = new PrsAppPurchaseNewItems_16Page();

