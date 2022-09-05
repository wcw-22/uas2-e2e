const Page = require('../Page')

class PrsAppPurchaseNewAorAccountAssignment_07Page extends Page {
  get nolabel_div () { return $('DIV.alert.alert-danger') } 
  get nolabel_li () { return $('DIV.alert.alert-danger > UL > LI') } 
  get upload_span () { return $('#uploadSealedSourceDocButton > APP-MESSAGE > SPAN') } 
  get next_span () { return $('#nextButton > APP-MESSAGE > SPAN') } 
  
  get upload_fileInput () { return $('INPUT[type="file"]:nth-of-type(2)') } 
 

  get fileIsInvalid_div () { return $('DIV.alert.alert-danger') } 
  get fileIsInvalid_li () {return $('DIV.alert.alert-danger > UL > LI')}
  
  open() {
    return super.open('/prs/app/purchase/new/aor/account-assignment/12593d5b-9d0b-456e-b79f-921cfdc1acca') // update as needed
  }
} // end of class PrsAppPurchaseNewAorAccountAssignment_07Page

module.exports = new PrsAppPurchaseNewAorAccountAssignment_07Page();

