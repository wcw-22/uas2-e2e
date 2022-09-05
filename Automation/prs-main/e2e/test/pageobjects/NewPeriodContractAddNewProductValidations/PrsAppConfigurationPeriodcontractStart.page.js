const Page = require('../Page')

class PrsAppConfigurationPeriodcontractStartPage extends Page {
  get contractNumber_span () { return $('DIV:nth-of-type(5) > DIV:nth-of-type(1) > LABEL.control-label > APP-MESSAGE > SPAN') } 
  get contractStart_textInput () { return $('#durationStartDate') } 
  get contractEnd_textInput () { return $('#durationEndDate') } 
  get others_radioInput () { return $('DIV:nth-of-type(2) > LABEL > INPUT[type="radio"][name="contractType"]') } 
  get contractNumber_textInput () { return $('#contractNumber') } 
  get contractValue_textInput () { return $('#contractValue') } 
  get campus_radioInput () { return $('DIV:nth-of-type(1) > LABEL > INPUT[type="radio"][name="categoryCode"]') } 
  get contractDescription_text () { return $('#contractDescription') } 
  get nolabel_div () { return $('NG-SELECT > DIV') } 
  get supplierselect0_textInput () { return $('DIV:nth-of-type(2) > INPUT[type="text"]') } 
  get managesupplierbutton0_button () { return $('TD:nth-of-type(2) > BUTTON[type="button"]') } 
  get nolabel_span () { return $('NG-DROPDOWN-PANEL > DIV.scroll-host > DIV:nth-of-type(2) > DIV > SPAN') } 
  get casNumber_span () { return $('DIV:nth-of-type(2) > DIV:nth-of-type(1) > LABEL.control-label > APP-MESSAGE > SPAN') } 

  open() {
    return super.open('/prs/app/configuration/periodcontract/start/b5e6ead2-1a81-4ccc-89cc-1921a2d775de') // update as needed
  }
} // end of class PrsAppConfigurationPeriodcontractStartPage

module.exports = new PrsAppConfigurationPeriodcontractStartPage();

