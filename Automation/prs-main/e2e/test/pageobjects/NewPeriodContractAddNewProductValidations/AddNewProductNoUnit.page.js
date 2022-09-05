const Page = require('../Page')

class AddNewProductNoUnitPage extends Page {
  get unit_select () { return $('#unit') } 
  // available 3 options: 'Please Select', 'Ea', 'Box', 

  get addproductbutton_button () { return $('#addProductButton') } 
  get unitIsRequired_ul () { return $('DIV.alert.alert-danger > UL') } 
  get originalquantityunit_select () { return $('#originalQuantityUnit') } 

  open() {
    return super.open('/prs/app/configuration/periodcontract/manageCatalogue/b5e6ead2-1a81-4ccc-89cc-1921a2d775de/1/newProduct') // update as needed
  }
} // end of class AddNewProductNoUnitPage

module.exports = new AddNewProductNoUnitPage();

