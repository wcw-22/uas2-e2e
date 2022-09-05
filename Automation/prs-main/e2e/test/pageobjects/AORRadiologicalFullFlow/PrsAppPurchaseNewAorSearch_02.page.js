const Page = require('../Page')

class PrsAppPurchaseNewAorSearch_02Page extends Page {
  get backNext_div () { return $('DIV:nth-of-type(2) > DIV.row > DIV.col-md-12') } 
  get radioactivesearchresulttable0ActionAddBtn_button () { return $('TD:nth-of-type(1) > BUTTON[type="button"]') } 
  get nextbutton_button () { return $('APP-AOR-SEARCH > DIV > DIV:nth-of-type(2) > DIV.row > DIV.col-md-12 > #nextButton') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/search/12593d5b-9d0b-456e-b79f-921cfdc1acca') // update as needed
  }
} // end of class PrsAppPurchaseNewAorSearch_02Page

module.exports = new PrsAppPurchaseNewAorSearch_02Page();

