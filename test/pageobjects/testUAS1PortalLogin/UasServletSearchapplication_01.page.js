'use strict';

const Page = require('../Page')

class UasServletSearchapplication_01Page extends Page {
  get searchstr_textInput () { return $('INPUT[type="text"][name="searchStr"]') } 
  get submit_submitInput () { return $('INPUT[type="submit"][name="Submit"]') } 

  open() {
    return super.open('/uas/servlet/SearchApplication') // update as needed
  }
} // end of class UasServletSearchapplication_01Page

module.exports = new UasServletSearchapplication_01Page();

