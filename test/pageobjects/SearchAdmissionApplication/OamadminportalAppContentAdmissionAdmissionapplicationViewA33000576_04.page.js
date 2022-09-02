'use strict';

const Page = require('../Page')

class OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576_04Page extends Page {
  get nolabel_app_admission_application_view () { return $('APP-ADMISSION-APPLICATION-VIEW') } 

  open() {
    return super.open('/oamadminportal/app/content/admission/admissionapplication/view/A33000576?searchState=%7B%22nusnetId%22:null,%22applNo%22:%2233000576%22,%22stdNo%22:null,%22email%22:null%7D') // update as needed
  }
} // end of class OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576_04Page

module.exports = new OamadminportalAppContentAdmissionAdmissionapplicationViewA33000576_04Page();

