'use strict';

const Page = require('../Page')

class UasServletSearchapplication_02Page extends Page {
  get searchstr_textInput () { return $('INPUT[type="text"][name="searchStr"]') } 
  get submit_submitInput () { return $('INPUT[type="submit"][name="Submit"]') } 

  open() {
    return super.open('/uas/servlet/SearchApplication') // update as needed
  }
} // end of class UasServletSearchapplication_02Page

module.exports = new UasServletSearchapplication_02Page();

