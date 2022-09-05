const Page = require('../Page')

class PrsAppPurchaseNewAorAccountAssignment_Validations_1Page extends Page {
  get nolabel_div () { return $('DIV.alert.alert-danger') } 
  get nolabel_ul () { return $('DIV.alert.alert-danger > UL') } 
  get locationIsRequired_li () { return $('DIV.alert.alert-danger > UL > LI:nth-of-type(1)') } 
  get epv_li () { return $('DIV.alert.alert-danger > UL > LI:nth-of-type(2)') } 
  get pop_li () { return $('DIV.alert.alert-danger > UL > LI:nth-of-type(3)') } 
  get acctassignement_li () { return $('DIV.alert.alert-danger > UL > LI:nth-of-type(4)') } 
  get wbs_li () { return $('LI:nth-of-type(5)') } 
  get inventoryOwnerIsRequired_li () { return $('LI:nth-of-type(6)') } 
  get next_span () { return $('BUTTON:nth-of-type(3) > APP-MESSAGE > SPAN') } 


  get storageLocation_select () { return $('#location') } 
  get estimatedProcurementValueSgd_textInput () { return $('#estimatedProcurementValue') } 
  get purposeOfPurchase_text () { return $('#purposeOfPurchase') } 
  get wbs_textInput () { return $('TD:nth-of-type(2) > INPUT') } 
  get epv_numberInput () { return $('INPUT[type="number"]') } 

  get glCode_select () { return $('TD:nth-of-type(3) > SELECT') }
  get epvTbl_numberInput () { return $('INPUT[type="number"]') } 
  get error_div() { return $('DIV.alert.alert-danger > UL > LI') }
  open() {
    return super.open('/prs/app/purchase/new/aor/account-assignment/73834a33-c80d-458b-a31b-a656408d6ee1') // update as needed
  }
} // end of class PrsAppPurchaseNewAorAccountAssignment_Validations_1Page

module.exports = new PrsAppPurchaseNewAorAccountAssignment_Validations_1Page();

