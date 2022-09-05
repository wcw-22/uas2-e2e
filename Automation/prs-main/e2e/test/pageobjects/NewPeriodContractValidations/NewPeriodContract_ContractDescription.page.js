const Page = require('../Page')

class NewPeriodContract_ContractDescriptionPage extends Page {
  get contractDescription_div () { return $('DIV:nth-of-type(10)') } 
  get nolabel_div () { return $('DIV:nth-of-type(10) > DIV:nth-of-type(2)') } 
  get contractDescription_text () { return $('#contractDescription') } 
  get publish_button () { return $('BUTTON:nth-of-type(3)') } 
  get nolabel_ul () { return $('DIV.alert.alert-danger > UL') } 

  open() {
    return super.open('/prs/app/configuration/periodcontract/start/a6b67c5b-b5b8-4a10-9672-2db0bf67b058') // update as needed
  }
} // end of class NewPeriodContract_ContractDescriptionPage

module.exports = new NewPeriodContract_ContractDescriptionPage();

