const Page = require('../Page')

class NewProductPage extends Page {
  get chemicalname_textInput () { return $('DIV > DIV > DIV:nth-of-type(2) > #chemicalName') } 
  get casnumber_textInput () { return $('DIV > DIV > DIV:nth-of-type(2) > #casNumber') } 
  get manufacturer_textInput () { return $('DIV > DIV > DIV:nth-of-type(2) > #manufacturer') } 
  get productmanufacturernumber_textInput () { return $('DIV > DIV > DIV:nth-of-type(2) > #productManufacturerNumber') } 
  get concentration_textInput () { return $('#concentration') } 
  get concentrationunit_select () { return $('#concentrationUnit') } 
  // available 16 options: 'Please Select', 'Grams/Cubic Metre', 'Grams/Litre', 'Kilograms/Cubic Metre', 'Micrograms/Cubic Metre', 'Micrograms/Litre', 'Micromolar (Micromoles/Litre)', 'Milligram/Millilitre', 'Milligrams/Cubic Metre', 'Milligrams/Litre', 'Millimolar (Millimoles/Litre)', 'Molar (Moles/Litre)', 'Parts Per Million', 'Percentage', 'Volume/Volume Percent (%V/V)', 'Weight/Volume Percentage (%W/V)', 

  get physicalForm_select () { return $('#physicalForm') } 
  // available 4 options: 'Please Select', 'Gas', 'Liquid', 'Solid', 

  get originalPackagingSize_textInput () { return $('#originalQuantity') } 
  get originalquantityunit_select () { return $('#originalQuantityUnit') } 
  // available 1 options: 'Please Select', 

  get unit_select () { return $('#unit') } 
  // available 3 options: 'Please Select', 'Ea', 'Box', 

  get supplierPartNumber_textInput () { return $('#supplierPartNumber') } 
  get minquantity0_textInput () { return $('TD:nth-of-type(2) > INPUT') } 
  get unitprice0_textInput () { return $('TD:nth-of-type(4) > INPUT') } 
  get addproductbutton_button () { return $('#addProductButton') } 
  get nolabel_span () { return $('NG-DROPDOWN-PANEL > DIV.scroll-host > DIV:nth-of-type(2) > DIV:nth-of-type(7) > SPAN') } 
  get _13463677_span () { return $('NG-DROPDOWN-PANEL > DIV.scroll-host > DIV:nth-of-type(2) > DIV:nth-of-type(1) > SPAN') } 
  get nolabel_span () { return $('NG-DROPDOWN-PANEL > DIV.scroll-host > DIV:nth-of-type(2) > DIV:nth-of-type(1) > SPAN') } 
  get _17871amp_span () { return $('NG-DROPDOWN-PANEL > DIV.scroll-host > DIV:nth-of-type(2) > DIV:nth-of-type(1) > SPAN') } 
  get nolabel_ul () { return $('DIV.alert.alert-danger > UL') } 
  get casNumber_span () { return $('DIV:nth-of-type(2) > DIV:nth-of-type(1) > LABEL.control-label > APP-MESSAGE > SPAN') } 

  open() {
    return super.open('/prs/app/configuration/periodcontract/manageCatalogue/b5e6ead2-1a81-4ccc-89cc-1921a2d775de/1/newProduct') // update as needed
  }
} // end of class NewProductPage

module.exports = new NewProductPage();

