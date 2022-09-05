const Page = require('../Page')

class PrsAppConfigurationPeriodcontractSearch_01Page extends Page {
  get nolabel_ul () { return $('DIV.alert.alert-danger > UL') } 

  open() {
    return super.open('/prs/app/configuration/periodcontract/search') // update as needed
  }
} // end of class PrsAppConfigurationPeriodcontractSearch_01Page

module.exports = new PrsAppConfigurationPeriodcontractSearch_01Page();

