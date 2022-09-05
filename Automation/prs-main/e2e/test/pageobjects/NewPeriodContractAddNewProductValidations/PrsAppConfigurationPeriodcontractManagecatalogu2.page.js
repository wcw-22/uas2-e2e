const Page = require('../Page')

class PrsAppConfigurationPeriodcontractManagecatalogu2Page extends Page {
  get addnewproductbutton_button () { return $('APP-MANAGE-CATALOGUE > DIV:nth-of-type(1) > FORM.form-horizontal > DIV:nth-of-type(1) > DIV.col-sm-12 > DIV:nth-of-type(1) > DIV:nth-of-type(2) > DIV:nth-of-type(2) > #addNewProductButton') } 

  open() {
    return super.open('/prs/app/configuration/periodcontract/manageCatalogue/b5e6ead2-1a81-4ccc-89cc-1921a2d775de/1') // update as needed
  }
} // end of class PrsAppConfigurationPeriodcontractManagecatalogu2Page

module.exports = new PrsAppConfigurationPeriodcontractManagecatalogu2Page();

