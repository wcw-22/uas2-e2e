const Page = require('../Page')

class AddNewProductNoOriginalPackagingSizeUnitPage extends Page {
  get originalPackagingSize_textInput () { return $('#originalQuantity') } 
  get originalquantityunit_select () { return $('#originalQuantityUnit') } 
  // available 8 options: 'Please Select', 'L', 'mL', 'æL', 'g', 'mg', 'kg', 'gal', 

  get addproductbutton_button () { return $('#addProductButton') } 
  get packagingUnitIsRequired_ul () { return $('DIV.alert.alert-danger > UL') } 

  open() {
    return super.open('/prs/app/configuration/periodcontract/manageCatalogue/b5e6ead2-1a81-4ccc-89cc-1921a2d775de/1/newProduct') // update as needed
  }
} // end of class AddNewProductNoOriginalPackagingSizeUnitPage

module.exports = new AddNewProductNoOriginalPackagingSizeUnitPage();

