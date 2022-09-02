'use strict';

const Page = require('../Page')

class UasLogin_01Page extends Page {
  get webfxMenuObject232_link () { return $('#webfx-menu-object-232') } 
  get webfxMenuObject3_link () { return $('#webfx-menu-object-3') } 

  open() {
    return super.open('/uas/Login') // update as needed
  }
} // end of class UasLogin_01Page

module.exports = new UasLogin_01Page();

