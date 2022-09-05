const Page = require('../Page')

class PrsAppConfigurationPeriodcontractSearchPage extends Page {
  get contractNumber_span () { return $('DIV:nth-of-type(1) > DIV:nth-of-type(1) > LABEL.control-label > APP-MESSAGE > SPAN') } 
  get contractNumber_div () { return $('FORM.form-horizontal > DIV:nth-of-type(1)') } 
  get contractnumber_textInput () { return $('#contractNumber') } 
  get contractDescription_textInput () { return $('#contractDescription') } 
  get contractStart_textInput () { return $('#startDate') } 
  get contractEnd_textInput () { return $('#endDate') } 
  get casnumber_textInput () { return $('#casNumber') } 
  get _13463677_span () { return $('NG-DROPDOWN-PANEL > DIV.scroll-host > DIV:nth-of-type(2) > DIV:nth-of-type(1) > SPAN') } 
  get chemicalName_textInput () { return $('#chemicalName') } 
  get suppliersselectTrigger_button () { return $('#suppliersSelect-trigger') } 
  get supplierPartNumber_span () { return $('DIV:nth-of-type(8) > DIV:nth-of-type(1) > LABEL.control-label > APP-MESSAGE > SPAN') } 
  get supplierPartNumber_textInput () { return $('#supplierPartNumber') } 
  get contractCategory_select () { return $('#category') } 
  get all_radioInput () { return $('LABEL:nth-of-type(1) > INPUT[type="radio"][name="contractStatus"]') } 
  get filtertext_textInput () { return $('#suppliersSelect-filter') } 
  // available 5 options: 'Please Select', 'Solvent', 'Chemical', 'Acid and Base', 'Deuterated Solvent', 

  get defunct_radioInput () { return $('LABEL:nth-of-type(2) > INPUT[type="radio"][name="contractStatus"]') } 
  get draft_radioInput () { return $('LABEL:nth-of-type(3) > INPUT[type="radio"][name="contractStatus"]') } 
  get published_label () { return $('LABEL:nth-of-type(4)') } 
  get published_radioInput () { return $('LABEL:nth-of-type(4) > INPUT[type="radio"][name="contractStatus"]') } 
  get unpublished_radioInput () { return $('LABEL:nth-of-type(5) > INPUT[type="radio"][name="contractStatus"]') } 
  get periodcontractsearch_button () { return $('#periodContractSearch') } 
  get periodcontractreset_button () { return $('#periodContractReset') } 
  get clearAll_span () { return $('#periodContractReset > APP-MESSAGE > SPAN') } 
  get _13463677_span () { return $('NG-DROPDOWN-PANEL > DIV.scroll-host > DIV:nth-of-type(2) > DIV:nth-of-type(1) > SPAN') } 
  get _01ComputerSystemPteLtd_label () { return $('LI:nth-of-type(1) > LABEL.checkbox-inline') } 
  get _01ComputerSystemPteLtd_checkboxInput () { return $('LI:nth-of-type(1) > LABEL.checkbox-inline > INPUT[type="checkbox"]') } 
  get suppliersselectClearall_button () { return $('#suppliersSelect-clearAll') } 
  get nolabel_ul () { return $('DIV.alert.alert-danger > UL') } 

  open() {
    return super.open('/prs/app/configuration/periodcontract/search') // update as needed
  }
} // end of class PrsAppConfigurationPeriodcontractSearchPage

module.exports = new PrsAppConfigurationPeriodcontractSearchPage();

