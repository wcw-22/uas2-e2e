const Page = require('../Page')

class PrsAppConfigurationPeriodcontractStart_01Page extends Page {
  get nolabel_ul () { return $('DIV.alert.alert-danger > UL') } 
  get contractStart_textInput () { return $('#durationStartDate') } 
  get contractEnd_textInput () { return $('#durationEndDate') } 
  get contractNumber_textInput () { return $('#contractNumber') } 
  get contractValue_textInput () { return $('#contractValue') } 
  get campus_label () { return $('DIV:nth-of-type(9) > DIV:nth-of-type(2) > DIV:nth-of-type(1) > LABEL') } 
  get campus_radioInput () { return $('DIV:nth-of-type(1) > LABEL > INPUT[type="radio"][name="categoryCode"]') } 
  get contractDescription_text () { return $('#contractDescription') } 
  get supplier_span () { return $('TH:nth-of-type(1) > APP-MESSAGE > SPAN') } 
  get nolabel_textInput () { return $('DIV:nth-of-type(2) > INPUT[type="text"]') } 
  get publish_button () { return $('BUTTON:nth-of-type(3)') } 

  open() {
    return super.open('/prs/app/configuration/periodcontract/start/9522769a-b159-49b1-a966-696db58b99f7') // update as needed
  }
} // end of class PrsAppConfigurationPeriodcontractStart_01Page

module.exports = new PrsAppConfigurationPeriodcontractStart_01Page();

