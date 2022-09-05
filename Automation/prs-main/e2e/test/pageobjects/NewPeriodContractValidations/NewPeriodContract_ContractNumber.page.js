const Page = require('../Page')

class NewPeriodContract_ContractNumberPage extends Page {
  get contractStart_div () { return $('FORM.form-horizontal > DIV:nth-of-type(2)') } 
  get contractStart_textInput () { return $('#durationStartDate') } 
  get contractEnd_div () { return $('FORM.form-horizontal > DIV:nth-of-type(3)') } 
  get contractEnd_textInput () { return $('#durationEndDate') } 
  get others_radioInput () { return $('DIV:nth-of-type(2) > LABEL > INPUT[type="radio"][name="contractType"]') } 
  get contractNumber_div () { return $('DIV:nth-of-type(5)') } 
  get contractNumber_textInput () { return $('#contractNumber') } 
  get publish_button () { return $('BUTTON:nth-of-type(3)') } 
  get contractNumber_span () { return $('DIV:nth-of-type(5) > DIV:nth-of-type(1) > LABEL.control-label > APP-MESSAGE > SPAN') } 
  get nolabel_ul () { return $('DIV.alert.alert-danger > UL') } 

  open() {
    return super.open('/prs/app/configuration/periodcontract/start/a6b67c5b-b5b8-4a10-9672-2db0bf67b058') // update as needed
  }
} // end of class NewPeriodContract_ContractNumberPage

module.exports = new NewPeriodContract_ContractNumberPage();

