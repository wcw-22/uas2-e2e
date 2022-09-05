const Page = require('../Page')

class PrsAppConfigurationPeriodcontractStartPage extends Page {
  get contractStatus_span () { return $('DIV:nth-of-type(1) > DIV:nth-of-type(1) > LABEL.control-label > APP-MESSAGE > SPAN') } 
  get publish_span () { return $('BUTTON:nth-of-type(3) > APP-MESSAGE > SPAN') } 

  open() {
    return super.open('/prs/app/configuration/periodcontract/start/9522769a-b159-49b1-a966-696db58b99f7') // update as needed
  }
} // end of class PrsAppConfigurationPeriodcontractStartPage

module.exports = new PrsAppConfigurationPeriodcontractStartPage();

