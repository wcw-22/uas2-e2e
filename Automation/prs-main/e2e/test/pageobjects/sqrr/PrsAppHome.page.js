const Page = require('../Page')

class PrsAppHomePage extends Page {
  get searchRequestLinkOld () { return $('UL:nth-of-type(1) > LI:nth-of-type(3) > A') }
  get searchRequestLink () { return $('#menuRequestSearch') }
  get firstTodo () { return $('TD:nth-of-type(2)') }
} // end of class PrsAppHomePage

module.exports = new PrsAppHomePage();

