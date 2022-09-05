const Page = require('./page')

class PrsApp_NewRequest_AOR_SearchPagePage extends Page {
  get nolabel_app_aor_search () { return $('APP-AOR-SEARCH') } 
  get nolabel_div () { return $('APP-AOR-SEARCH > DIV > DIV:nth-of-type(1) > DIV.col-md-12') } 
  get headingAORLandingPage () { return $('H2') } 
  get spanAORHeadingLandingPage () { return $('H2 > APP-MESSAGE > SPAN') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/search/ee9e4fd7-027e-46e3-b9d4-6b82599ad11a') // update as needed
  }
} // end of class PrsApp_NewRequest_AOR_SearchPagePage

module.exports = new PrsApp_NewRequest_AOR_SearchPagePage();

