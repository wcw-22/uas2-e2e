const Page = require('../Page')

class PrsAppDelegationSearch_01Page extends Page {
  get nusnetId_textInput () { return $('#userId') } 
  get row_count_div () { return $('DIV.pull-left') } 
  get delegate_radioInput () { return $('LABEL:nth-of-type(1) > INPUT[type="radio"][name="whoOption"]') } 
  get approver_radioInput () { return $('LABEL:nth-of-type(2) > INPUT[type="radio"][name="whoOption"]') } 
  get nusnetId_textInput () { return $('#userId') } 
  get duration_textInput () { return $('#durationStartDate') } 
  get searchClearAll_div () { return $('DIV.col-md-12.text-right') } 
  get search_button () { return $('DIV.col-md-12.text-right > BUTTON:nth-of-type(1)') } 
  get nolabel_div () { return $('DIV.pull-left') } 
  get nolabel_div () { return $('DIV.pull-left') } 
  get nolabel_div () { return $('DIV.pull-left') } 
  get nolabel_div () { return $('DIV.pull-left') } 
  get nusnetIdIsInvalid_li () { return $('DIV.alert.alert-danger > UL > LI') } 
  get nusnetIdIsInvalid_li () { return $('DIV.alert.alert-danger > UL > LI') } 
  get nusnetIdIsInvalid_li () { return $('DIV.alert.alert-danger > UL > LI') } 
  get nolabel_html () { return $('') } 
  get nusnetId_textInput () { return $('#userId') } 
  get noRecordsFound_p () { return $('DIV:nth-of-type(1) > DIV > DIV > P') } 
  get noRecordsFound_p () { return $('DIV:nth-of-type(1) > DIV > DIV > P') } 
  get toDateIsRequired_li () { return $('DIV.alert.alert-danger > UL > LI') } 
  get toDateIsRequired_li () { return $('DIV.alert.alert-danger > UL > LI') } 
  get nolabel_html () { return $('') } 
  get duration_textInput () { return $('#durationStartDate') } 
  get to_textInput () { return $('#durationEndDate') } 
  get fromDateIsRequired_li () { return $('DIV.alert.alert-danger > UL > LI') } 
  get fromDateIsRequired_li () { return $('DIV.alert.alert-danger > UL > LI') } 
  get fromDateIsRequired_li () { return $('DIV.alert.alert-danger > UL > LI') } 

  open() {
    return super.open('/prs/app/delegation/search') // update as needed
  }
} // end of class PrsAppDelegationSearch_01Page

module.exports = new PrsAppDelegationSearch_01Page();

