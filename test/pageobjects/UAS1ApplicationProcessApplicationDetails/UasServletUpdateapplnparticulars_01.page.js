'use strict';

const Page = require('../Page')

class UasServletUpdateapplnparticulars_01Page extends Page {
  get back_submitInput () { return $('INPUT:nth-of-type(3)') } 

  open() {
    return super.open('/uas/servlet/UpdateApplnParticulars') // update as needed
  }
} // end of class UasServletUpdateapplnparticulars_01Page

module.exports = new UasServletUpdateapplnparticulars_01Page();

