const Page = require('../Page')

class PrsAppPurchaseNewAorAccountAssignment_04Page extends Page {
  get upload_button () { return $('#uploadSealedSourceDocButton') } 
  get upload_fileInput () { return $('INPUT[type="file"]:nth-of-type(2)') } 
 
  get fileIsInvalid_div () { return $('DIV.alert.alert-danger') } 
  get fileIsInvalid_li () {return $('DIV.alert.alert-danger > UL > LI')}
  
  open() {
    return super.open('/prs/app/purchase/new/aor/account-assignment/12593d5b-9d0b-456e-b79f-921cfdc1acca') // update as needed
  }
} // end of class PrsAppPurchaseNewAorAccountAssignment_04Page

module.exports = new PrsAppPurchaseNewAorAccountAssignment_04Page();

