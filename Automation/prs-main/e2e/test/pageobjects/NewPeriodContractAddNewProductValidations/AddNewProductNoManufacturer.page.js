const Page = require('../Page')

class AddNewProductNoManufacturerPage extends Page {
  get casnumber_textInput () { return $('DIV > DIV > DIV:nth-of-type(2) > #casNumber') } 
  get addproductbutton_button () { return $('#addProductButton') } 
  get _13463677_span () { return $('NG-DROPDOWN-PANEL > DIV.scroll-host > DIV:nth-of-type(2) > DIV:nth-of-type(1) > SPAN') } 
  get clearManuf_span () { return $('#manufacturer > DIV > SPAN:nth-of-type(1)')}
  get manufacturerIsRequired_ul () { return $('DIV.alert.alert-danger > UL') } 

  open() {
    return super.open('/prs/app/configuration/periodcontract/manageCatalogue/b5e6ead2-1a81-4ccc-89cc-1921a2d775de/1/newProduct') // update as needed
  }
} // end of class AddNewProductNoManufacturerPage

module.exports = new AddNewProductNoManufacturerPage();

