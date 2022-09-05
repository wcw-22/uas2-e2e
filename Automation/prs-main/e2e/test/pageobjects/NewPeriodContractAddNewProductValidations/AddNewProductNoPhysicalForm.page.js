const Page = require('../Page')

class AddNewProductNoPhysicalFormPage extends Page {
  get manufacturer_textInput () { return $('DIV > DIV > DIV:nth-of-type(2) > #manufacturer') } 
  get physicalForm_select () { return $('#physicalForm') } 
  // available 4 options: 'Please Select', 'Gas', 'Liquid', 'Solid', 

  get addproductbutton_button () { return $('#addProductButton') } 
  get ad4de32b6da75_div () { return $('NG-DROPDOWN-PANEL > DIV.scroll-host > DIV:nth-of-type(2) > DIV:nth-of-type(1)') } 
  get physicalFormIsRequired_ul () { return $('DIV.alert.alert-danger > UL') } 

  open() {
    return super.open('/prs/app/configuration/periodcontract/manageCatalogue/b5e6ead2-1a81-4ccc-89cc-1921a2d775de/1/newProduct') // update as needed
  }
} // end of class AddNewProductNoPhysicalFormPage

module.exports = new AddNewProductNoPhysicalFormPage();

