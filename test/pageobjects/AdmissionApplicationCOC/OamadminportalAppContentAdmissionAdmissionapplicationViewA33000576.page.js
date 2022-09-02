'use strict';

const Page = require('../Page')

class OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page extends Page {
  get choiceOfCourses_app_message () { return $('APP-COURSE-CHOICE-VIEW > DIV.col-12.mt-3 > DIV.card > DIV:nth-of-type(1) > H6.mb-0.mt-1 > APP-MESSAGE') } 
  get singleDegreeCourses_app_message () { return $('APP-COURSE-CHOICE-VIEW > DIV.col-12.mt-3 > DIV.card > DIV:nth-of-type(2) > DIV:nth-of-type(1) > DIV:nth-of-type(1) > STRONG > APP-MESSAGE') } 
  get _1_td () { return $('DIV:nth-of-type(2) > DIV:nth-of-type(2) > TABLE > TBODY > TR:nth-of-type(1) > TD:nth-of-type(1)') } 
  get medicine_td () { return $('DIV:nth-of-type(2) > DIV:nth-of-type(2) > TABLE > TBODY > TR:nth-of-type(1) > TD:nth-of-type(2)') } 
  get _2_td () { return $('DIV:nth-of-type(2) > DIV:nth-of-type(2) > TABLE > TBODY > TR:nth-of-type(2) > TD:nth-of-type(1)') } 
  get dentistry_td () { return $('DIV:nth-of-type(2) > DIV:nth-of-type(2) > TABLE > TBODY > TR:nth-of-type(2) > TD:nth-of-type(2)') } 
  get _3_td () { return $('DIV:nth-of-type(2) > TABLE > TBODY > TR:nth-of-type(3) > TD:nth-of-type(1)') } 
  get law_td () { return $('DIV:nth-of-type(2) > TABLE > TBODY > TR:nth-of-type(3) > TD:nth-of-type(2)') } 
  get doubleDegreeCourses_app_message () { return $('DIV:nth-of-type(2) > DIV:nth-of-type(3) > DIV:nth-of-type(1) > STRONG > APP-MESSAGE') } 
  get _1_td () { return $('DIV:nth-of-type(4) > TABLE > TBODY > TR:nth-of-type(1) > TD:nth-of-type(1)') } 
  get lawMasterInPublicPolicy_td () { return $('DIV:nth-of-type(4) > TABLE > TBODY > TR:nth-of-type(1) > TD:nth-of-type(2)') } 
  get _2_td () { return $('DIV:nth-of-type(4) > TABLE > TBODY > TR:nth-of-type(2) > TD:nth-of-type(1)') } 
  get economicsLaw_td () { return $('DIV:nth-of-type(4) > TABLE > TBODY > TR:nth-of-type(2) > TD:nth-of-type(2)') } 
  get _3_td () { return $('DIV:nth-of-type(4) > TABLE > TBODY > TR:nth-of-type(3) > TD:nth-of-type(1)') } 
  get businessAdministrationLaw_td () { return $('DIV:nth-of-type(4) > TABLE > TBODY > TR:nth-of-type(3) > TD:nth-of-type(2)') } 
  get nolabel_app_message1 () { return $('DIV:nth-of-type(5) > DIV:nth-of-type(1) > STRONG > APP-MESSAGE') } 
  get yes_div () { return $('APP-COURSE-CHOICE-VIEW > DIV.col-12.mt-3 > DIV.card > DIV:nth-of-type(2) > DIV:nth-of-type(5) > DIV:nth-of-type(2)') } 
  get nolabel_app_message2 () { return $('APP-COURSE-CHOICE-VIEW > DIV.col-12.mt-3 > DIV.card > DIV:nth-of-type(2) > DIV:nth-of-type(6) > DIV:nth-of-type(1) > STRONG > APP-MESSAGE') } 
  get no_div () { return $('APP-COURSE-CHOICE-VIEW > DIV.col-12.mt-3 > DIV.card > DIV:nth-of-type(2) > DIV:nth-of-type(6) > DIV:nth-of-type(2)') } 
  get nolabel_app_message3 () { return $('DIV:nth-of-type(7) > DIV:nth-of-type(1) > STRONG > APP-MESSAGE') } 
  get no_div () { return $('APP-COURSE-CHOICE-VIEW > DIV.col-12.mt-3 > DIV.card > DIV:nth-of-type(2) > DIV:nth-of-type(7) > DIV:nth-of-type(2)') } 

  open() {
    return super.open('/oamadminportal/app/content/admission/admissionapplication/view/A33000576?searchState=%7B%22nusnetId%22:null,%22applNo%22:%2233000576%22,%22stdNo%22:null,%22email%22:null%7D') // update as needed
  }
} // end of class OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page

module.exports = new OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page();

