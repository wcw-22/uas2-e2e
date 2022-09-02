const Page = require('../Page')

class PrsAppPurchaseNewSearchPage extends Page {
  get radioactive_link () { return $('LI:nth-of-type(3) > A.nav-link') } 
  get radionuclideS_textInput () { return $('#radionuclides') } 
  get radioactiveMaterialName_textInput () { return $('#radioactiveMaterialName') } 
  get productNumber_textInput () { return $('#productNumberRadioactive') } 
  get sourceType_select () { return $('#radioactiveSourceType') } 
  // available 3 options: 'Please Select', 'SEALED', 'UNSEALED', 

  get physicalForm_select () { return $('#radioactivePhysicalForm') } 
  // available 4 options: 'Please Select', 'Gas', 'Liquid', 'Solid', 

  // click on to expose the following 1 field
  get realNumber_radioInput () { return $('#radioactiveActivityNotationType-real') } 
  get activityReal_textInput () { return $('#activityReal') } 

  // click on scientificNotation_radioInput to expose the following 3 fields
  get scientificNotation_radioInput () { return $('#radioactiveActivityNotationType-scientific') } 
  get activityCoefficient_textInput () { return $('#activityCoefficient') } 
  get basicAddon1_span () { return $('SPAN.input-group-addon') } // readonly
  get activityExponent_textInput () { return $('#activityExponent') } 

  get unitOfMeasureActivity_select () { return $('#radioactiveActivityUnit') } 
  // available 11 options: 'Please Select', 'BECQUEREL', 'CURIE', 'KILOBECQUEREL', 'MEGABECQUEREL', 'GIGABECQUEREL', 'TERABECQUEREL', 'MICROCURIE', 'MILLICURIE', 'NANOCURIE', 'KILOCURIE', 

  get radioactiveManufacturersSelectTrigger_button () { return $('#radioactiveManufacturersSelect-trigger') } 
  get radioactiveManufacturersSelectFilter_textInput () { return $('#radioactiveManufacturersSelect-filter') } 
  get radioactiveManufacturersSelectValue0_checkboxInput () { return $('#radioactiveManufacturersSelect-value-0') }
  get radioactiveSearchButton_button () { return $('#radioactiveSearchButton') }
  get searchResultSummary_label () { return $('DIV.pull-left.pagination-window-selector > LABEL') }
  get noRecordFound_span () { return $('TD > APP-MESSAGE > SPAN') }
  open() {
    return super.open('/prs/app/purchase/new/search/8979a0fb-5e60-409b-9e26-c357f41ef7c1') // update as needed
  }
} // end of class PrsAppPurchaseNewSearchPage

module.exports = new PrsAppPurchaseNewSearchPage();

