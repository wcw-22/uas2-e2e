'use strict';

const Page = require('../Page')

class UasServletSearchapplication_05Page extends Page {
  get webfxMenuObject232_link () { return $('#webfx-menu-object-232') } 
  get webfxMenuObject3_link () { return $('#webfx-menu-object-3') } 

  open() {
    return super.open('/uas/servlet/SearchApplication') // update as needed
  }
} // end of class UasServletSearchapplication_05Page

module.exports = new UasServletSearchapplication_05Page();

