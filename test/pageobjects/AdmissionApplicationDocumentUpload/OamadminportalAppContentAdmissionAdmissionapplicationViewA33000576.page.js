'use strict';

const Page = require('../Page')

class OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page extends Page {
  get nolabel_app_message () { return $('APP-REFEREE-VIEW > DIV.col-12.mt-3 > DIV.card > DIV:nth-of-type(1) > H6.mb-0.mt-1 > APP-MESSAGE') } 
  get documentUpload_app_message () { return $('APP-DOCUMENT-UPLOAD-VIEW > DIV.col-12.mt-3 > DIV.card > DIV:nth-of-type(1) > H6.mb-0.mt-1 > APP-MESSAGE') } 
  get requiredDocuments_app_message () { return $('APP-DOCUMENT-UPLOAD-VIEW > DIV.col-12.mt-3 > DIV.card > DIV:nth-of-type(2) > DIV:nth-of-type(1) > TABLE > THEAD.nus-blue-bg.text-white > TR > TH:nth-of-type(1) > APP-MESSAGE') } 
  get nricFrontAndBack_td () { return $('APP-DOCUMENT-UPLOAD-VIEW > DIV.col-12.mt-3 > DIV.card > DIV:nth-of-type(2) > DIV:nth-of-type(1) > TABLE > TBODY > TR:nth-of-type(1) > TD:nth-of-type(1)') } 
  get _01TestNricPdf_link () { return $('TR:nth-of-type(1) > TD:nth-of-type(2) > DIV > U > A') } 
  get nolabel_td () { return $('DIV:nth-of-type(1) > TABLE > TBODY > TR:nth-of-type(2) > TD:nth-of-type(1)') } 
  get _05TestAlevelresultPdf_link () { return $('TR:nth-of-type(2) > TD:nth-of-type(2) > DIV > U > A') } 
  get medicalReport_td () { return $('DIV:nth-of-type(1) > TABLE > TBODY > TR:nth-of-type(3) > TD:nth-of-type(1)') } 
  get _23TestMedicalletterPdf_link () { return $('TR:nth-of-type(3) > TD:nth-of-type(2) > DIV > U > A') } 

  open() {
    return super.open('/oamadminportal/app/content/admission/admissionapplication/view/A33000576?searchState=%7B%22nusnetId%22:null,%22applNo%22:%2233000576%22,%22stdNo%22:null,%22email%22:null%7D') // update as needed
  }
} // end of class OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page

module.exports = new OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576Page();

