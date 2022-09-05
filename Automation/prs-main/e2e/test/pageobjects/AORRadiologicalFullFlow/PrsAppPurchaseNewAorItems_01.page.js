const Page = require('../Page')

class PrsAppPurchaseNewAorItems_01Page extends Page {
  get nolabel_app_aor_items () { return $('APP-AOR-ITEMS') } 
  get nolabel_div () { return $('DIV.alert.alert-danger') } 
  get c14QuantityIsRequired_li () { return $('DIV.alert.alert-danger > UL > LI') } 
  get nolabel_li () { return $('DIV.alert.alert-danger > UL > LI') } 

  
  get quantity_numberInput () { return $('INPUT[type="number"]') } 
  get notationtypeRealInputActivity00_textInput () { return $('DIV:nth-of-type(1) > INPUT[type="text"]') } 
  get next_span () { return $('#nextButton > APP-MESSAGE > SPAN') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/items/12593d5b-9d0b-456e-b79f-921cfdc1acca') // update as needed
  }
} // end of class PrsAppPurchaseNewAorItems_01Page

module.exports = new PrsAppPurchaseNewAorItems_01Page();

