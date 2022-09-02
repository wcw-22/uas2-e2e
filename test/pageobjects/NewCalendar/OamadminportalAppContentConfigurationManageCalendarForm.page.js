'use strict';

const Page = require('../Page')

class OamadminportalAppContentConfigurationManageCalendarFormPage extends Page {
  get nolabel_div () { return $('FORM.form-horizontal > DIV:nth-of-type(1)') } 
  get category_select () { return $('#category') } 
  // available 4 options: 'Please select', 'Admission', 'Scholarship', 'Financial Aid', 

  get activity_select () { return $('#activity') } 
  // available 1 options: 'Please select', 

  get type_select () { return $('DIV:nth-of-type(3) > DIV:nth-of-type(2) > SELECT.form-select') } 
  get academicYear_textInput () { return $('#acadYear') } 
  get academicYear_textInput () { return $('#acadYear') } 
  get startDate_textInput () { return $('#startDate') } 
  get endDate_textInput () { return $('#endDate') } 
  get startDate_textInput () { return $('#startDate') } 
  get startDate_textInput () { return $('#startDate') } 
  get startDate_textInput () { return $('#startDate') } 
  get submit_app_message () { return $('BUTTON:nth-of-type(1) > APP-MESSAGE') } 
  get nolabel_li () { return $('UL.mb-0 > LI') } 
  get nolabel_li () { return $('UL.mb-0 > LI') } 
  get nolabel_li () { return $('UL.mb-0 > LI') } 
  get submit_button () { return $('DIV.col-md-12.text-end > BUTTON:nth-of-type(1)') } 
  get startDate_textInput () { return $('#startDate') } 
  get startDate_textInput () { return $('#startDate') } 
  get submit_app_message () { return $('BUTTON:nth-of-type(1) > APP-MESSAGE') } 
  get doYouWantToProceed_app_message () { return $('DIV.col-sm-12 > APP-MESSAGE') } 
  get doYouWantToProceed_app_message () { return $('DIV.col-sm-12 > APP-MESSAGE') } 
  get doYouWantToProceed_app_message () { return $('DIV.col-sm-12 > APP-MESSAGE') } 
  get doYouWantToProceed_app_message () { return $('DIV.col-sm-12 > APP-MESSAGE') } 
  get yes_app_message () { return $('BUTTON:nth-of-type(1) > APP-MESSAGE') } 
  get nolabel_li () { return $('UL.mb-0 > LI') } 
  get nolabel_li () { return $('UL.mb-0 > LI') } 
  get nolabel_li () { return $('UL.mb-0 > LI') } 
  get ok_app_message () { return $('APP-MANAGE-CALENDAR-FORM > DIV.container-large > FORM > DIV.row.mt-2.mb-5 > DIV.col-sm-12.text-end > BUTTON > APP-MESSAGE') } 

  open() {
    return super.open('/oamadminportal/app/content/configuration/manage-calendar/form/63b7ba1e-f6f1-4358-8ff2-fb9b7955d815') // update as needed
  }
} // end of class OamadminportalAppContentConfigurationManageCalendarFormPage

module.exports = new OamadminportalAppContentConfigurationManageCalendarFormPage();

