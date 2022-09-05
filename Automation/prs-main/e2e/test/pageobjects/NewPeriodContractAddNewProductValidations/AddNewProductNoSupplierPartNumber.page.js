const Page = require('../Page')

class AddNewProductNoSupplierPartNumberPage extends Page {
  get originalquantityunit_select () { return $('#originalQuantityUnit') } 
  // available 8 options: 'Please Select', 'L', 'mL', 'æL', 'g', 'mg', 'kg', 'gal', 

  get unit_select () { return $('#unit') } 
  // available 3 options: 'Please Select', 'Ea', 'Box', 

  get supplierPartNumber_div () { return $('DIV:nth-of-type(10)') } 
  get supplierPartNumber_textInput () { return $('#supplierPartNumber') } 
  get minquantity0_textInput () { return $('TD:nth-of-type(2) > INPUT') } 
  get nolabel_td () { return $('TD:nth-of-type(4)') } 
  get unitprice0_textInput () { return $('TD:nth-of-type(4) > INPUT') } 
  get addproductbutton_button () { return $('#addProductButton') } 
  get supplierIsRequired_ul () { return $('DIV.alert.alert-danger > UL') } 

  open() {
    return super.open('/prs/app/configuration/periodcontract/manageCatalogue/b5e6ead2-1a81-4ccc-89cc-1921a2d775de/1/newProduct') // update as needed
  }
} // end of class AddNewProductNoSupplierPartNumberPage

module.exports = new AddNewProductNoSupplierPartNumberPage();

