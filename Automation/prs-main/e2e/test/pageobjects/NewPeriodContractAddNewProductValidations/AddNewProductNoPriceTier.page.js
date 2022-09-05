const Page = require('../Page')

class AddNewProductNoPriceTierPage extends Page {
  get supplierPartNumber_textInput () { return $('#supplierPartNumber') } 
  get _1na_tr () { return $('TBODY > TR') } 
  get minquantity0_textInput () { return $('TD:nth-of-type(2) > INPUT') } 
  get unitprice0_textInput () { return $('TD:nth-of-type(4) > INPUT') } 
  get addproductbutton_button () { return $('#addProductButton') } 

  open() {
    return super.open('/prs/app/configuration/periodcontract/manageCatalogue/b5e6ead2-1a81-4ccc-89cc-1921a2d775de/1/newProduct') // update as needed
  }
} // end of class AddNewProductNoPriceTierPage

module.exports = new AddNewProductNoPriceTierPage();

