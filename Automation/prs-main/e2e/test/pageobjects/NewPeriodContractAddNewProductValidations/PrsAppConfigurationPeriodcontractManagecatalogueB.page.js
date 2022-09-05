const Page = require('../Page')

class PrsAppConfigurationPeriodcontractManagecatalogueBPage extends Page {
  get addNewProduct_span () { return $('APP-MANAGE-CATALOGUE > DIV:nth-of-type(1) > FORM.form-horizontal > DIV:nth-of-type(1) > DIV.col-sm-12 > DIV:nth-of-type(1) > DIV:nth-of-type(2) > DIV:nth-of-type(2) > #addNewProductButton > APP-MESSAGE > SPAN') } 

  open() {
    return super.open('/prs/app/configuration/periodcontract/manageCatalogue/b5e6ead2-1a81-4ccc-89cc-1921a2d775de/1') // update as needed
  }
} // end of class PrsAppConfigurationPeriodcontractManagecatalogueBPage

module.exports = new PrsAppConfigurationPeriodcontractManagecatalogueBPage();

