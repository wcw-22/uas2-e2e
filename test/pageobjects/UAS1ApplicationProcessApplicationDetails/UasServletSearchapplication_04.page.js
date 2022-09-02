'use strict';

const Page = require('../Page')

class UasServletSearchapplication_04Page extends Page {
  get applicationDetails_link () { return $('TD > TABLE:nth-of-type(3) > TBODY > TR > TD:nth-of-type(1) > H2 > A') } 

  open() {
    return super.open('/uas/servlet/SearchApplication') // update as needed
  }
} // end of class UasServletSearchapplication_04Page

module.exports = new UasServletSearchapplication_04Page();

