const Page = require('./page')

class PrsAppPurchaseNewAorItems_Validations extends Page {
  get div_error () { return $('DIV.alert.alert-danger') } 
 

  get selectChemPhysicalForm () { return $('TR:nth-of-type(1) > TD:nth-of-type(1) > DIV:nth-of-type(2) > DIV:nth-of-type(1) > DIV.row.form-separator > DIV:nth-of-type(2) > SELECT') } 
  // available 4 options: 'Please Select', 'Gas', 'Liquid', 'Solid', 

  get selectChemTotalQty () { return $('TR:nth-of-type(1) > TD:nth-of-type(1) > DIV:nth-of-type(2) > DIV:nth-of-type(2) > DIV.row.form-separator > DIV:nth-of-type(2) > INPUT[type="number"]') } 
  get selectChemUOM () { return $('TR:nth-of-type(1) > TD:nth-of-type(1) > DIV:nth-of-type(2) > DIV:nth-of-type(2) > DIV.row.form-separator > DIV:nth-of-type(3) > SELECT') } 
  // available 1 options: 'Please Select', 

  get selectRadioSourceType () { return $('TR:nth-of-type(2) > TD:nth-of-type(1) > DIV:nth-of-type(2) > DIV:nth-of-type(1) > DIV.row.form-separator > DIV:nth-of-type(2) > SELECT') } 
  // available 3 options: 'Please Select', 'SEALED', 'UNSEALED', 

  get txtRadioTotalQty () { return $('TR:nth-of-type(2) > TD:nth-of-type(1) > DIV:nth-of-type(2) > DIV:nth-of-type(2) > DIV.row.form-separator > DIV:nth-of-type(2) > INPUT[type="number"]') } 
  get txtRadioActivity () { return $('DIV:nth-of-type(1) > INPUT[type="text"]') } 
  get selectRadioActivityUOM () { return $('DIV:nth-of-type(2) > DIV:nth-of-type(2) > SELECT') } 
  // available 11 options: 'Please Select', 'Bq', 'Ci', 'KBq', 'MBq', 'GBq', 'TBq', 'mCI', 'mCi', 'nCI', 'kCi', 

  get nolabel_numberInput () { return $('INPUT[type="number"]') } 
  get scientificNotation_radioInput () { return $('LABEL:nth-of-type(2) > INPUT[type="radio"]') } 
  get txtRadioActivityExponent () { return $('#notationType-scientific-exponent-ACTIVITY-0-0') } 
  get txtRadioActivityCoeff () { return $('#notationType-scientific-coef-ACTIVITY-0-0') } 
  get selectRadioActivityUOM () { return $('DIV:nth-of-type(2) > DIV:nth-of-type(2) > SELECT') } 

  get txtBioQty () { return $('TR:nth-of-type(3) > TD:nth-of-type(1) > DIV:nth-of-type(2) > DIV.col-sm-5 > DIV.row.form-separator > DIV:nth-of-type(2) > INPUT[type="number"]') } 
  get selectBioUOM () { return $('TR:nth-of-type(3) > TD:nth-of-type(1) > DIV:nth-of-type(2) > DIV.col-sm-5 > DIV.row.form-separator > DIV:nth-of-type(3) > SELECT') } 
  // available 14 options: 'Please Select', 'EA', 'IU', 'NU', 'CU', 'g', 'mg', 'µg', 'ng', 'l', 'ml', 'µl', 'ccm', 'cm', 

  get next_span () { return $('BUTTON:nth-of-type(3) > APP-MESSAGE > SPAN') } 




  open() {
    return super.open('/prs/app/purchase/new/aor/items/3781624b-f400-4567-a529-89fead2cde02') // update as needed
  }
} // end of class PrsAppPurchaseNewAorItems_Validations

module.exports = new PrsAppPurchaseNewAorItems_Validations();

