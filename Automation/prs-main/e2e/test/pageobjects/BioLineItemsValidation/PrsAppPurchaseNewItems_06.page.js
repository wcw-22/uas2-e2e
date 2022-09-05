const Page = require('../Page')

class PrsAppPurchaseNewItems_06Page extends Page {
  get prNo_li () { return $('DIV.alert.alert-success > UL > LI:nth-of-type(2)') } 
  get geneticallyModified_select () { return $('DIV:nth-of-type(1) > DIV:nth-of-type(2) > SELECT') } 
  // available 3 options: 'Please Select', 'No', 'Yes', 

  get productFormat_select () { return $('DIV:nth-of-type(2) > DIV:nth-of-type(2) > DIV:nth-of-type(2) > SELECT') } 
  // available 9 options: 'Please Select', 'CRYOPRESERVED', 'FROZEN (-80 DEGREE CELSIUS)', 'FROZEN (-20 DEGREE CELSIUS)', 'CHILLED (-4 DEGREE CELSIUS)', 'LYOPHILIZED', 'CRYOSECTIONS', 'PARAFILM SECTION', 'LIVE', 

  get saveasdraftbutton_button () { return $('#saveAsDraftButton') } 

  open() {
    return super.open('/prs/app/purchase/new/items/5f264cc6-a749-4b02-802c-faa384de3228') // update as needed
  }
} // end of class PrsAppPurchaseNewItems_06Page

module.exports = new PrsAppPurchaseNewItems_06Page();

