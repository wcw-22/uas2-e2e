const Page = require('../Page')

class PrsAppPurchaseNewQuotation_16Page extends Page {
  get errMsg_li () { return $('DIV.alert.alert-danger > UL > LI') } 
  get theSelectedProductSRequireSAnMohAvsImportPermitIConfirmThatIHaveObtainedAValidImportPermitFollowingApprovalOfPurchaseRequestForPurchasesFromAOverseasVendor_checkboxInput () { return $('#mohAVSProduct') } 
  get nextbutton_button () { return $('#nextButton') } 

  get backbutton_button () { return $('APP-PURCHASE-QUOTATION > DIV > DIV:nth-of-type(5) > DIV.row > DIV.col-md-12 > #backButton') } 

  open() {
    return super.open('/prs/app/purchase/new/quotation/6013fcbc-66f4-495e-97d7-2a103b9185f5') // update as needed
  }
} // end of class PrsAppPurchaseNewQuotation_16Page

module.exports = new PrsAppPurchaseNewQuotation_16Page();

