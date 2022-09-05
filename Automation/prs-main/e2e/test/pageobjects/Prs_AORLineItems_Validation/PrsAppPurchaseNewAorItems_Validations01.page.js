const Page = require('../Page')

class PrsAppPurchaseNewAorItems_Validations01 extends Page {
  get nolabel_div () { return $('DIV.panel.panel-primary > DIV:nth-of-type(2)') } 
  get div_error () { return $('DIV.alert.alert-danger') } 
  
  get notationtypeScientificCoefActivity00_textInput () { return $('DIV.input-group > INPUT:nth-of-type(1)') } 
  get notationtypeScientificExponentActivity00_textInput () { return $('INPUT:nth-of-type(2)') } 
  get notationtypeUnitActivity00_select () { return $('DIV:nth-of-type(2) > DIV:nth-of-type(2) > SELECT') } 
  // available 11 options: 'Please Select', 'Bq', 'Ci', 'KBq', 'MBq', 'GBq', 'TBq', 'mCI', 'mCi', 'nCI', 'kCi', 

  get nextbutton_button () { return $('#nextButton') } 
  get nolabel_tr () { return $('DIV.col-sm-10 > DIV.panel-body > DIV > TABLE > TBODY > TR') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/items/3e0acbba-3904-42dd-bc04-c3bf3b34fa87') // update as needed
  }
} // end of class PrsAppPurchaseNewAorItems_Validations01

module.exports = new PrsAppPurchaseNewAorItems_Validations01();

