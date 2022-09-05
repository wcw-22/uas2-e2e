const Page = require('../Page')

class NewPeriodContract_ContractValuePage extends Page {
  get nolabel_form () { return $('FORM.form-horizontal') } 
  get nus_radioInput () { return $('DIV:nth-of-type(1) > LABEL > INPUT[type="radio"][name="contractType"]') } 
  get nolabel_div () { return $('DIV:nth-of-type(5) > DIV:nth-of-type(2)') } 
  get contractNumber_textInput () { return $('#contractNumber') } 
  get nolabel_div () { return $('DIV:nth-of-type(7) > DIV:nth-of-type(2)') } 
  get contractValue_textInput () { return $('#contractValue') } 
  get contractDescription_text () { return $('#contractDescription') } 
  get publish_button () { return $('BUTTON:nth-of-type(3)') } 
  get nolabel_ul () { return $('DIV.alert.alert-danger > UL') } 

  open() {
    return super.open('/prs/app/configuration/periodcontract/start/a6b67c5b-b5b8-4a10-9672-2db0bf67b058') // update as needed
  }
} // end of class NewPeriodContract_ContractValuePage

module.exports = new NewPeriodContract_ContractValuePage();

