const Page = require('../Page')

class NewPeriodContract_EmailPage extends Page {
  get contractStart_textInput () { return $('#durationStartDate') } 
  get contractEnd_textInput () { return $('#durationEndDate') } 
  get others_label () { return $('DIV:nth-of-type(4) > DIV:nth-of-type(2) > DIV:nth-of-type(2) > LABEL') } 
  get others_radioInput () { return $('DIV:nth-of-type(2) > LABEL > INPUT[type="radio"][name="contractType"]') } 
  get contractNumber_textInput () { return $('#contractNumber') } 
  get contractValue_textInput () { return $('#contractValue') } 
  get campus_label () { return $('DIV:nth-of-type(9) > DIV:nth-of-type(2) > DIV:nth-of-type(1) > LABEL') } 
  get campus_radioInput () { return $('DIV:nth-of-type(1) > LABEL > INPUT[type="radio"][name="categoryCode"]') } 
  get contractDescription_text () { return $('#contractDescription') } 
  get nolabel_div () { return $('DIV:nth-of-type(11) > DIV:nth-of-type(2)') } 
  get recipientsForEmailReminderNusnet_textInput () { return $('DIV.input-group > INPUT[type="text"]') } 
  get nolabel_textInput () { return $('DIV:nth-of-type(2) > INPUT[type="text"]') } 
  get publish_button () { return $('BUTTON:nth-of-type(3)') } 
  get nolabel_span () { return $('NG-DROPDOWN-PANEL > DIV.scroll-host > DIV:nth-of-type(2) > DIV > SPAN') } 
  get nolabel_ul () { return $('DIV.alert.alert-danger > UL') } 

  open() {
    return super.open('/prs/app/configuration/periodcontract/start/38ef761b-00a5-4d41-86c8-245c322030b1') // update as needed
  }
} // end of class NewPeriodContract_EmailPage

module.exports = new NewPeriodContract_EmailPage();

