const Page = require('../Page')

class PrsAppConfigurationPeriodcontractSearchPage extends Page {
  get contractNumber_span () { return $('DIV:nth-of-type(1) > DIV:nth-of-type(1) > LABEL.control-label > APP-MESSAGE > SPAN') } 
  get contractnumber_textInput () { return $('#contractNumber') } 
  get contractDescription_textInput () { return $('#contractDescription') } 
  get contractStart_textInput () { return $('#startDate') } 
  get contractEnd_textInput () { return $('#endDate') } 
  get casnumber_textInput () { return $('#casNumber') } 
  get chemicalName_div () { return $('DIV:nth-of-type(6)') } 
  get chemicalName_textInput () { return $('#chemicalName') } 
  get suppliersselectTrigger_button () { return $('#suppliersSelect-trigger') } 
  get supplierPartNumber_textInput () { return $('#supplierPartNumber') } 
  get contractCategory_select () { return $('#category') } 
  // available 5 options: 'Please Select', 'Solvent', 'Chemical', 'Acid and Base', 'Deuterated Solvent', 

  get all_radioInput () { return $('LABEL:nth-of-type(1) > INPUT[type="radio"][name="contractStatus"]') } 
  get defunct_radioInput () { return $('LABEL:nth-of-type(2) > INPUT[type="radio"][name="contractStatus"]') } 
  get draft_radioInput () { return $('LABEL:nth-of-type(3) > INPUT[type="radio"][name="contractStatus"]') } 
  get published_radioInput () { return $('LABEL:nth-of-type(4) > INPUT[type="radio"][name="contractStatus"]') } 
  get unpublished_radioInput () { return $('LABEL:nth-of-type(5) > INPUT[type="radio"][name="contractStatus"]') } 
  get periodcontractsearch_button () { return $('#periodContractSearch') } 
  get periodcontractreset_button () { return $('#periodContractReset') } 
  //get _13463677_span () { return $('#afe98960d442 > DIV.scroll-host > DIV:nth-of-type(2) > #afe98960d442-0 > SPAN') } 
  get _13463677_span () { return $('NG-DROPDOWN-PANEL > DIV.scroll-host > DIV:nth-of-type(2) > DIV:nth-of-type(1) > SPAN') } 
  get _01ComputerSystemPteLtd_label () { return $('LI:nth-of-type(1) > LABEL.checkbox-inline') } 
  get _01ComputerSystemPteLtd_checkboxInput () { return $('#suppliersSelect-value-0') } 
  get suppliersselectClearall_button () { return $('#suppliersSelect-clearAll') } 
  get filtertext_textInput () { return $('#suppliersSelect-filter') } 
  get nolabel_label () { return $('DIV.pull-left.pagination-window-selector > LABEL') } 

  open() {
    return super.open('/prs/app/configuration/periodcontract/search') // update as needed
  }
} // end of class PrsAppConfigurationPeriodcontractSearchPage

module.exports = new PrsAppConfigurationPeriodcontractSearchPage();

