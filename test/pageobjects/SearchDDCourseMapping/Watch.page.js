'use strict';

const Page = require('../Page')

class WatchPage extends Page {
  get tcCourse9_p () { return $('APP-MANAGE-DDP-MAPPING-SEARCH > #content-container > DIV.container-large > DIV:nth-of-type(2) > DIV:nth-of-type(2) > #ddpMappingSearchResultTable > DIV:nth-of-type(1) > #ddpMappingSearchResultTable-table > TBODY > TR > TD:nth-of-type(1) > P.form-control-plaintext') } 

  open() {
    return super.open('/watch?v=1WLFhjQ0cDc&list=RDZBGTrTxEHP4&index=6') // update as needed
  }
} // end of class WatchPage

module.exports = new WatchPage();

