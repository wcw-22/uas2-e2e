'use strict';

const Page = require('../Page')

class OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page extends Page {
  get achievement_app_message () { return $('APP-ACHIEVEMENT-VIEW > DIV.col-12.mt-3 > DIV.card > DIV:nth-of-type(1) > H6.mb-0.mt-1 > APP-MESSAGE') } 
  get activity_app_message () { return $('DIV.form-horizontal > DIV:nth-of-type(1) > DIV:nth-of-type(1) > APP-MESSAGE') } 
  get level_app_message () { return $('DIV.form-horizontal > DIV:nth-of-type(1) > DIV:nth-of-type(2) > APP-MESSAGE') } 
  get levelOfAchievement_app_message () { return $('DIV:nth-of-type(1) > DIV:nth-of-type(3) > APP-MESSAGE') } 
  get positionHeld_app_message () { return $('DIV:nth-of-type(1) > DIV:nth-of-type(4) > APP-MESSAGE') } 
  get from_app_message () { return $('DIV:nth-of-type(1) > DIV:nth-of-type(5) > APP-MESSAGE') } 
  get to_app_message () { return $('DIV:nth-of-type(6) > APP-MESSAGE') } 
  get nolabel_div () { return $('DIV.form-horizontal > DIV:nth-of-type(2) > DIV:nth-of-type(1)') } 
  get notApplicable_div1 () { return $('DIV.form-horizontal > DIV:nth-of-type(2) > DIV:nth-of-type(2)') } 
  get notApplicable_div2 () { return $('DIV.form-horizontal > DIV:nth-of-type(2) > DIV:nth-of-type(3)') } 
  get member_div () { return $('DIV.form-horizontal > DIV:nth-of-type(2) > DIV:nth-of-type(4)') } 
  get _012018_div () { return $('DIV.form-horizontal > DIV:nth-of-type(2) > DIV:nth-of-type(5)') } 
  get _122020_div () { return $('DIV.form-horizontal > DIV:nth-of-type(2) > DIV:nth-of-type(6)') } 
  get nolabel_app_message () { return $('DIV.form-horizontal > DIV:nth-of-type(3) > DIV:nth-of-type(1) > APP-MESSAGE') } 
  get referenceName_app_message () { return $('DIV.form-horizontal > DIV:nth-of-type(3) > DIV:nth-of-type(2) > APP-MESSAGE') } 
  get position_app_message () { return $('DIV:nth-of-type(3) > DIV:nth-of-type(3) > APP-MESSAGE') } 
  get email_app_message () { return $('DIV:nth-of-type(3) > DIV:nth-of-type(4) > APP-MESSAGE') } 
  get telephone_app_message () { return $('DIV:nth-of-type(3) > DIV:nth-of-type(5) > APP-MESSAGE') } 
  get singaporeRedCross_div () { return $('DIV.form-horizontal > DIV:nth-of-type(4) > DIV:nth-of-type(1)') } 
  get xavierLau_div () { return $('DIV.form-horizontal > DIV:nth-of-type(4) > DIV:nth-of-type(2)') } 
  get manager_div () { return $('DIV:nth-of-type(4) > DIV:nth-of-type(3)') } 
  get hlTehYahooCom_div () { return $('DIV:nth-of-type(4) > DIV:nth-of-type(4)') } 
  get _6533339999_div () { return $('DIV:nth-of-type(4) > DIV:nth-of-type(5)') } 
  get personalStatement_app_message () { return $('APP-ACHIEVEMENT-VIEW > DIV.col-12.mt-3 > DIV.card > DIV:nth-of-type(2) > DIV:nth-of-type(2) > DIV:nth-of-type(1) > STRONG > APP-MESSAGE') } 
  get creativeInnovative_div () { return $('DIV:nth-of-type(3) > DIV.pre-wrap') } 

  open() {
    return super.open('/oamadminportal/app/content/admission/admissionapplication/view/A33000576?searchState=%7B%22nusnetId%22:null,%22applNo%22:%2233000576%22,%22stdNo%22:null,%22email%22:null%7D') // update as needed
  }
} // end of class OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page

module.exports = new OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page();

