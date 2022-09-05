const Page = require('../Page')

class AddNewProductNoCasNumberPage extends Page {
  get chemicalname_textInput () { return $('DIV > DIV > DIV:nth-of-type(2) > #chemicalName') } 
  get addproductbutton_button () { return $('#addProductButton') } 
  get ametazoleHydrochloride_span () { return $('NG-DROPDOWN-PANEL > DIV.scroll-host > DIV:nth-of-type(2) > DIV:nth-of-type(1) > SPAN') } 
  get casnumber_textInput () { return $('DIV:nth-of-type(3) > #casNumber') } 
  get _13463677_span () { return $('NG-DROPDOWN-PANEL > DIV.scroll-host > DIV:nth-of-type(2) > DIV:nth-of-type(1) > SPAN') } 
  get caseClear_span () { return $('#casNumber > DIV > SPAN') } 
  get casNumberIsRequired_ul () { return $('DIV.alert.alert-danger > UL') } 

  open() {
    return super.open('/prs/app/configuration/periodcontract/manageCatalogue/b5e6ead2-1a81-4ccc-89cc-1921a2d775de/1/newProduct') // update as needed
  }
} // end of class AddNewProductNoCasNumberPage

module.exports = new AddNewProductNoCasNumberPage();

