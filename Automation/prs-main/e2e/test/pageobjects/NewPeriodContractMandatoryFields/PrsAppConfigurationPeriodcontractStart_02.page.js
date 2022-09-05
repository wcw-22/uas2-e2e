const Page = require('../Page')

class PrsAppConfigurationPeriodcontractStart_02Page extends Page {

  get nolabel_textInput () { return $('DIV:nth-of-type(2) > INPUT[type="text"]') } 
  get nolabel_span () { return $('NG-DROPDOWN-PANEL > DIV.scroll-host > DIV:nth-of-type(2) > DIV:nth-of-type(1) > SPAN') } 
  get publish_button () { return $('BUTTON:nth-of-type(3)') } 
  get nolabel_ul () { return $('DIV.alert.alert-danger > UL') } 
  get contractStart_textInput () { return $('#durationStartDate') } 
  get contractEnd_textInput () { return $('#durationEndDate') } 
  get contractNumber_textInput () { return $('#contractNumber') } 
  get contractValue_textInput () { return $('#contractValue') } 
  get contractEnd_span () { return $('DIV:nth-of-type(3) > DIV:nth-of-type(1) > LABEL.control-label > APP-MESSAGE > SPAN') } 
  get contractNumber_span () { return $('DIV:nth-of-type(5) > DIV:nth-of-type(1) > LABEL.control-label > APP-MESSAGE > SPAN') } 
  get contractDescription_text () { return $('#contractDescription') } 
  get contractCategory_select () { return $('#category') } 

  open() {
    return super.open('/prs/app/configuration/periodcontract/start/9522769a-b159-49b1-a966-696db58b99f7') // update as needed
  }
} // end of class PrsAppConfigurationPeriodcontractStart_02Page

module.exports = new PrsAppConfigurationPeriodcontractStart_02Page();

