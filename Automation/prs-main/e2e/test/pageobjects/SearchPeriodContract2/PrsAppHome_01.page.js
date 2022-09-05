const Page = require('../Page')

class PrsAppHome_01Page extends Page {
  get configuration_link () { return $('A.dropdown-toggle') } 
  get managePeriodContract_link () { return $('LI.dropdown.dropdown-submenu > A.dropdown-toggle') } 
  get searchPeriodContract_link () { return $('LI.dropdown.dropdown-submenu > UL.dropdown-menu > LI:nth-of-type(1) > A') } 

  open() {
    return super.open('/prs/app/home') // update as needed
  }
} // end of class PrsAppHome_01Page

module.exports = new PrsAppHome_01Page();

