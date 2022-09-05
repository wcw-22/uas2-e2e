const Page = require('../Page')

class PrsAppPurchaseNewItems_07Page extends Page {
  get prSaveMsg_li () { return $('DIV.alert.alert-success > UL > LI:nth-of-type(1)') } 
  get notationtypeRealInputBioConcentration0_textInput () { return $('DIV:nth-of-type(1) > INPUT[type="text"]') } 
  get productNumberAtccNumberAddgeneCatalogueNumber_textInput () { return $('DIV:nth-of-type(3) > DIV:nth-of-type(2) > INPUT[type="text"]') } 
  get nextbutton_button () { return $('#nextButton') } 

  open() {
    return super.open('/prs/app/purchase/new/items/5f264cc6-a749-4b02-802c-faa384de3228') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_07Page

module.exports = new PrsAppPurchaseNewItems_07Page();

