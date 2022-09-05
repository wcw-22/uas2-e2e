const Page = require('../Page')

class AddNewProductNoOriginalPackagingSizePage extends Page {
  get physicalForm_select () { return $('#physicalForm') } 
  // available 4 options: 'Please Select', 'Gas', 'Liquid', 'Solid', 

  get nolabel_div () { return $('DIV:nth-of-type(8) > DIV:nth-of-type(2)') } 
  get originalPackagingSize_textInput () { return $('#originalQuantity') } 
  get addproductbutton_button () { return $('#addProductButton') } 
  get originalquantityunit_select () { return $('#originalQuantityUnit') } 
  get packagingSizeIsRequired_ul () { return $('DIV.alert.alert-danger > UL') } 

  open() {
    return super.open('/prs/app/configuration/periodcontract/manageCatalogue/b5e6ead2-1a81-4ccc-89cc-1921a2d775de/1/newProduct') // update as needed
  }
} // end of class AddNewProductNoOriginalPackagingSizePage

module.exports = new AddNewProductNoOriginalPackagingSizePage();

