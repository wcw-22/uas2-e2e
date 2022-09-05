const Page = require('../Page')

class NewPeriodContract_Success1Page extends Page {
  get recipientsForEmailReminderNusnet_textInput () { return $('DIV.input-group > INPUT[type="text"]') } 
  get publish_button () { return $('BUTTON:nth-of-type(3)') } 
  get contractNumber_textInput () { return $('#contractNumber') } 
  get nolabel_ul () { return $('DIV.alert.alert-danger > UL') } 

  open() {
    return super.open('/prs/app/configuration/periodcontract/start/f466a6a9-a4d0-4ac4-89ce-d4d6dc22541a') // update as needed
  }
} // end of class NewPeriodContract_Success1Page

module.exports = new NewPeriodContract_Success1Page();

