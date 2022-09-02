'use strict';

const Page = require('../Page')

class IndexPage extends Page {
  get menuddpmappingsearch_link () { return $('#menuDDPMappingSearch') } 

  open() {
    return super.open('/') // update as needed
  }
} // end of class IndexPage

module.exports = new IndexPage();

