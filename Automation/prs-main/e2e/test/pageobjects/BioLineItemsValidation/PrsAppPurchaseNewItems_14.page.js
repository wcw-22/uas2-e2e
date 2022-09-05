const Page = require('../Page')

class PrsAppPurchaseNewItems_14Page extends Page {
  get nolabel_div () { return $('DIV.alert.alert-danger') } 
  get nolabel_li () { return $('DIV.alert.alert-danger > UL > LI') } 
  get notationtypeScientificCoefBioConcentration0_textInput () { return $('DIV.input-group > INPUT:nth-of-type(1)') } 
  get notationtypeScientificExponentBioConcentration0_textInput () { return $('INPUT:nth-of-type(2)') } 
  get nextbutton_button () { return $('#nextButton') } 

  open() {
    return super.open('/prs/app/purchase/new/items/5f264cc6-a749-4b02-802c-faa384de3228') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_14Page

module.exports = new PrsAppPurchaseNewItems_14Page();

