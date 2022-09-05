const Page = require('../Page')

class AddNewProductValidateNumbers extends Page {
  get concentration_textInput () { return $('#concentration') } 

  get originalPackagingSize_textInput () { return $('#originalQuantity') } 

  get supplierPartNumber_textInput () { return $('#supplierPartNumber') } 
  get minquantity0_textInput () { return $('TD:nth-of-type(2) > INPUT') } 
  get unitprice0_textInput () { return $('TD:nth-of-type(4) > INPUT') } 
  get addproductbutton_button () { return $('#addProductButton') } 
  get unit_select () { return $('#unit') } 
  get noOfItemsInBox_textInput () { return $('#quantityPerUnit') } 
 
  get errorMessage () { return $('DIV.alert.alert-danger > UL') } 
  get concentrationunit_select () { return $('#concentrationUnit') } 
  get cancelbutton_button () { return $('#cancelButton') } 

  open() {
    return super.open('/prs/app/configuration/periodcontract/manageCatalogue/b5e6ead2-1a81-4ccc-89cc-1921a2d775de/1/newProduct') // update as needed
  }
} // end of class AddNewProductValidateNumbers

module.exports = new AddNewProductValidateNumbers();

