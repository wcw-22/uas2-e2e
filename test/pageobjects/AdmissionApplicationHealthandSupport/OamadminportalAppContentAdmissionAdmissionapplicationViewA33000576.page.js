'use strict';

const Page = require('../Page')

class OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page extends Page {
  get healthAndSupport_app_message () { return $('APP-HEALTH-SUPPORT-VIEW > DIV.col-12.mt-3 > DIV.card > DIV:nth-of-type(1) > H6.mb-0.mt-1 > APP-MESSAGE') } 
  get anyHealthDeclaration_app_message () { return $('APP-HEALTH-SUPPORT-VIEW > DIV.col-12.mt-3 > DIV.card > DIV:nth-of-type(2) > DIV:nth-of-type(1) > DIV:nth-of-type(1) > STRONG > APP-MESSAGE') } 
  get yes_div () { return $('APP-HEALTH-SUPPORT-VIEW > DIV.col-12.mt-3 > DIV.card > DIV:nth-of-type(2) > DIV:nth-of-type(1) > DIV:nth-of-type(2)') } 
  get healthAndSupportCondition_app_message () { return $('DIV:nth-of-type(2) > DIV:nth-of-type(2) > DIV:nth-of-type(1) > DIV:nth-of-type(1) > STRONG > APP-MESSAGE') } 
  get chronicHepatitisB_div () { return $('DIV:nth-of-type(2) > DIV:nth-of-type(2) > DIV:nth-of-type(1) > DIV:nth-of-type(2)') } 
  get genetic_div () { return $('DIV:nth-of-type(2) > DIV:nth-of-type(2) > DIV.pre-wrap') } 
  get healthAndSupportCondition_app_message () { return $('DIV:nth-of-type(3) > DIV:nth-of-type(1) > DIV:nth-of-type(1) > STRONG > APP-MESSAGE') } 
  get diabetes_div () { return $('DIV:nth-of-type(3) > DIV:nth-of-type(1) > DIV:nth-of-type(2)') } 
  get genetic_div () { return $('DIV:nth-of-type(3) > DIV:nth-of-type(2) > DIV.pre-wrap') } 
  get healthAndSupportCondition_app_message () { return $('DIV:nth-of-type(4) > DIV:nth-of-type(1) > DIV:nth-of-type(1) > STRONG > APP-MESSAGE') } 
  get others_div () { return $('DIV:nth-of-type(4) > DIV:nth-of-type(1) > DIV:nth-of-type(2)') } 
  get nolabel_div () { return $('DIV:nth-of-type(4) > DIV:nth-of-type(2) > DIV.pre-wrap') } 
  get nolabel_app_message1 () { return $('DIV:nth-of-type(5) > DIV:nth-of-type(1) > DIV.col-lg-5 > STRONG > APP-MESSAGE') } 
  get medicationFromSpecialist_div () { return $('DIV:nth-of-type(5) > DIV:nth-of-type(2) > DIV.pre-wrap') } 
  get nolabel_app_message2 () { return $('DIV.col-lg-10 > STRONG > APP-MESSAGE') } 
  get milkRashes_div () { return $('DIV:nth-of-type(4) > DIV.pre-wrap') } 

  open() {
    return super.open('/oamadminportal/app/content/admission/admissionapplication/view/A33000576?searchState=%7B%22nusnetId%22:null,%22applNo%22:%2233000576%22,%22stdNo%22:null,%22email%22:null%7D') // update as needed
  }
} // end of class OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page

module.exports = new OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page();

