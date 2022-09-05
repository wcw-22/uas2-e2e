const Page = require('../Page')

class PrsAppHome_02Page extends Page {
  get configuration_link () { return $('A.dropdown-toggle') } 
  get manageUserAccess_link () { return $('LI:nth-of-type(1) > A.dropdown-toggle') } 
  get searchUserAccess_link () { return $('LI:nth-of-type(1) > UL.dropdown-menu > LI:nth-of-type(1) > A') } 
  get searchbutton_button () { return $('#searchButton') } 
  get validation_error_li () { return $('DIV.alert.alert-danger > UL > LI') } 
  get validation_error_li () { return $('DIV.alert.alert-danger > UL > LI') } 
  get role_select () { return $('#role') } 
  get searchbutton_button () { return $('#searchButton') } 
  get result_count_div () { return $('DIV.pull-left') } 
  get nusnetId_textInput () { return $('#userId') } 
  get all_radioInput () { return $('#statusOption-all') } 
  get active_radioInput () { return $('#statusOption-active') }
  get inactive_radioInput () { return $('#statusOption-inactive') }
  get name_textInput () { return $('#name') }
  get facultyRirc_select () { return $('#faculty') }
  get departmentLeftSelect_select () { return $('#department-left-select') }
  get departmentRightSelect_select () { return $('#department-right-select') }
  get noRecordsFound_p () { return $('P') }
  get manageUserAccessSearch_span () { return $('H2 > APP-MESSAGE > SPAN') }
  
  open() {
    return super.open('/prs/app/home') // update as needed
  }
} // end of class PrsAppHome_02Page

module.exports = new PrsAppHome_02Page();

