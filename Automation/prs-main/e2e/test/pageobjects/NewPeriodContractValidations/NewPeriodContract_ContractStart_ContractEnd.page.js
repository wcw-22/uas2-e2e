const Page = require('../Page')

class NewPeriodContract_ContractStart_ContractEndPage extends Page {
  get contractNumber_span () { return $('DIV:nth-of-type(5) > DIV:nth-of-type(1) > LABEL.control-label > APP-MESSAGE > SPAN') } 
  get contractStart_textInput () { return $('#durationStartDate') } 
  get contractEnd_textInput () { return $('#durationEndDate') } 
  get contractNumber_textInput () { return $('#contractNumber') } 
  get contractValue_textInput () { return $('#contractValue') } 
  get campus_radioInput () { return $('DIV:nth-of-type(1) > LABEL > INPUT[type="radio"][name="categoryCode"]') } 
  get contractDescription_text () { return $('#contractDescription') } 
  get nolabel_textInput () { return $('DIV:nth-of-type(2) > INPUT[type="text"]') } 
  get publish_button () { return $('BUTTON:nth-of-type(3)') } 
  get nolabel_span () { return $('NG-DROPDOWN-PANEL > DIV.scroll-host > DIV:nth-of-type(2) > DIV > SPAN') } 
  get nolabel_ul () { return $('DIV.alert.alert-danger > UL') } 

  open() {
    return super.open('/prs/app/configuration/periodcontract/start/a6b67c5b-b5b8-4a10-9672-2db0bf67b058') // update as needed
  }
} // end of class NewPeriodContract_ContractStart_ContractEndPage

module.exports = new NewPeriodContract_ContractStart_ContractEndPage();

