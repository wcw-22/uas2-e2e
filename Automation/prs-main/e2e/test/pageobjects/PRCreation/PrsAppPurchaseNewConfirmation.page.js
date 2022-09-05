const Page = require('../Page')

class PrsAppPurchaseNewConfirmationPage extends Page {
  get items_div () { return $('APP-PURCHASE-VIEW-LINE-ITEMS > DIV:nth-of-type(1) > DIV.col-sm-12 > DIV.panel.panel-primary > DIV:nth-of-type(1)') } 
  get items_span () { return $('APP-PURCHASE-VIEW-LINE-ITEMS > DIV:nth-of-type(1) > DIV.col-sm-12 > DIV.panel.panel-primary > DIV:nth-of-type(1) > STRONG > APP-MESSAGE > SPAN') } 
  get _1PlusPrivateLimited_div () { return $('APP-FRAGMENT-LINEITEM-VIEW > DIV:nth-of-type(1) > DIV.col-sm-12 > DIV.panel.panel-primary > DIV:nth-of-type(1)') } 
  get _1PlusPrivateLimited_strong () { return $('APP-FRAGMENT-LINEITEM-VIEW > DIV:nth-of-type(1) > DIV.col-sm-12 > DIV.panel.panel-primary > DIV:nth-of-type(1) > STRONG') } 
  get accountAssignment_div () { return $('APP-PURCHASE-VIEW-ACCOUNT-ASSIGNMENT > DIV.row > DIV.col-sm-12 > DIV.panel.panel-primary > DIV:nth-of-type(1)') } 
  get summaryOfQuotations_div () { return $('APP-PURCHASE-VIEW-QUOTATIONS > DIV:nth-of-type(1) > DIV.col-sm-12 > DIV.panel.panel-primary > DIV:nth-of-type(1)') } 
  get yes_button () { return $('DIV.col-md-12 > BUTTON:nth-of-type(1)') } 
  get items_div () { return $('APP-PURCHASE-VIEW-LINE-ITEMS > DIV:nth-of-type(1) > DIV.col-sm-12 > DIV.panel.panel-primary > DIV.panel-heading') } 
  get _1PlusPrivateLimited_div () { return $('APP-FRAGMENT-LINEITEM-VIEW > DIV:nth-of-type(1) > DIV.col-sm-12 > DIV.panel.panel-primary > DIV.panel-heading') } 
  get accountAssignment_div () { return $('APP-PURCHASE-VIEW-ACCOUNT-ASSIGNMENT > DIV.row > DIV.col-sm-12 > DIV.panel.panel-primary > DIV.panel-heading') } 
  get summaryOfQuotations_div () { return $('APP-PURCHASE-VIEW-QUOTATIONS > DIV:nth-of-type(1) > DIV.col-sm-12 > DIV.panel.panel-primary > DIV.panel-heading') } 

  open() {
    return super.open('/prs/app/purchase/new/confirmation/a75c81e0-2444-43ff-9f95-3fd813316050') // update as needed
  }
} // end of class PrsAppPurchaseNewConfirmationPage

module.exports = new PrsAppPurchaseNewConfirmationPage();

