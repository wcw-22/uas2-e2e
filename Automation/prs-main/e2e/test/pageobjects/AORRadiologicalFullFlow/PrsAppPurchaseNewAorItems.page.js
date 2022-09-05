const Page = require('../Page')

class PrsAppPurchaseNewAorItemsPage extends Page {
  get next_span () { return $('#nextButton > APP-MESSAGE > SPAN') } 
  get sourceType_select () { return $('DIV.row.form-separator > DIV:nth-of-type(2) > SELECT') } 
  get quantity_numberInput () { return $('INPUT[type="number"]') } 
  get quantity_numberInput () { return $('INPUT[type="number"]') } 
  get quantity_numberInput () { return $('INPUT[type="number"]') } 
  get notationtypeRealInputActivity00_textInput () { return $('DIV:nth-of-type(1) > INPUT[type="text"]') } 
  get nolabel_td () { return $('DIV:nth-of-type(2) > DIV > TABLE > TBODY > TR > TD:nth-of-type(1)') } 
  get notationtypeRealInputActivity00_textInput () { return $('DIV:nth-of-type(1) > INPUT[type="text"]') } 
  get notationtypeRealInputActivity00_textInput () { return $('DIV:nth-of-type(1) > INPUT[type="text"]') } 
  get notationtypeUnitActivity00_select () { return $('DIV:nth-of-type(2) > DIV:nth-of-type(2) > SELECT') } 
  get nolabel_td () { return $('DIV:nth-of-type(2) > DIV > TABLE > TBODY > TR > TD:nth-of-type(1)') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/items/12593d5b-9d0b-456e-b79f-921cfdc1acca') // update as needed
  }
} // end of class PrsAppPurchaseNewAorItemsPage

module.exports = new PrsAppPurchaseNewAorItemsPage();

