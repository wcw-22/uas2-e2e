'use strict';

const Page = require('../Page')

class OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page extends Page {
  get educationOthers_app_message () { return $('APP-EDUCATION-OTHERS-VIEW > DIV.col-12.mt-3 > DIV.card > DIV:nth-of-type(1) > H6.mb-0.mt-1 > APP-MESSAGE') } 
  get sat_app_message () { return $('APP-EDUCATION-OTHERS-VIEW > DIV.col-12.mt-3 > DIV.card > DIV:nth-of-type(2) > DIV:nth-of-type(1) > DIV.col-lg-5 > STRONG > APP-MESSAGE') } 
  get _012022_div () { return $('APP-EDUCATION-OTHERS-VIEW > DIV.col-12.mt-3 > DIV.card > DIV:nth-of-type(2) > DIV:nth-of-type(2) > DIV:nth-of-type(2)') } 
  get nolabel_app_message () { return $('DIV:nth-of-type(3) > TABLE > TBODY > TR:nth-of-type(1) > TD:nth-of-type(1) > APP-MESSAGE') } 
  get _750_td () { return $('DIV:nth-of-type(3) > TABLE > TBODY > TR:nth-of-type(1) > TD:nth-of-type(2)') } 
  get mathematics_app_message () { return $('DIV:nth-of-type(3) > TABLE > TBODY > TR:nth-of-type(2) > TD:nth-of-type(1) > APP-MESSAGE') } 
  get _700_td () { return $('DIV:nth-of-type(3) > TABLE > TBODY > TR:nth-of-type(2) > TD:nth-of-type(2)') } 
  get satEssay_app_message () { return $('DIV:nth-of-type(4) > DIV:nth-of-type(1) > STRONG > APP-MESSAGE') } 
  get essayAnalysis_app_message () { return $('DIV:nth-of-type(5) > TABLE > TBODY > TR:nth-of-type(1) > TD:nth-of-type(1) > APP-MESSAGE') } 
  get _7_td () { return $('DIV:nth-of-type(5) > TABLE > TBODY > TR:nth-of-type(1) > TD:nth-of-type(2)') } 
  get essayReading_app_message () { return $('DIV:nth-of-type(5) > TABLE > TBODY > TR:nth-of-type(2) > TD:nth-of-type(1) > APP-MESSAGE') } 
  get _8_td () { return $('DIV:nth-of-type(5) > TABLE > TBODY > TR:nth-of-type(2) > TD:nth-of-type(2)') } 
  get essayWriting_app_message () { return $('TR:nth-of-type(3) > TD:nth-of-type(1) > APP-MESSAGE') } 
  get _8_td () { return $('DIV:nth-of-type(5) > TABLE > TBODY > TR:nth-of-type(3) > TD:nth-of-type(2)') } 
  get satSubjects_app_message () { return $('APP-EDUCATION-OTHERS-VIEW > DIV.col-12.mt-3 > DIV.card > DIV:nth-of-type(2) > DIV:nth-of-type(6) > DIV:nth-of-type(1) > STRONG > APP-MESSAGE') } 
  get nolabel_div () { return $('APP-EDUCATION-OTHERS-VIEW > DIV.col-12.mt-3 > DIV.card > DIV:nth-of-type(2) > DIV:nth-of-type(7) > DIV:nth-of-type(2)') } 
  get nolabel_div () { return $('DIV:nth-of-type(9) > DIV.col-12.text-end') } 

  open() {
    return super.open('/oamadminportal/app/content/admission/admissionapplication/view/A33000576?searchState=%7B%22nusnetId%22:null,%22applNo%22:%2233000576%22,%22stdNo%22:null,%22email%22:null%7D') // update as needed
  }
} // end of class OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page

module.exports = new OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page();

