
/*** Generated spec file ***/
const PrsLoginPage = require('../../pageobjects/NewPeriodContractAddNewProductValidations/PrsLogin.page')
const PrsAppSwitchrole_01Page = require('../../pageobjects/NewPeriodContractAddNewProductValidations/PrsAppSwitchrole_01.page')
const PrsAppHome_01Page = require('../../pageobjects/NewPeriodContractAddNewProductValidations/PrsAppHome_01.page')
const PrsAppConfigurationPeriodcontractStartPage = require('../../pageobjects/NewPeriodContractAddNewProductValidations/PrsAppConfigurationPeriodcontractStart.page')
const PrsAppConfigurationPeriodcontractManagecatalogueBPage = require('../../pageobjects/NewPeriodContractAddNewProductValidations/PrsAppConfigurationPeriodcontractManagecatalogueB.page')
const AddNewProductNoChemicalNamePage = require('../../pageobjects/NewPeriodContractAddNewProductValidations/AddNewProductNoChemicalName.page')
const AddNewProductNoCasNumberPage = require('../../pageobjects/NewPeriodContractAddNewProductValidations/AddNewProductNoCasNumber.page')
const AddNewProductNoManufacturerPage = require('../../pageobjects/NewPeriodContractAddNewProductValidations/AddNewProductNoManufacturer.page')
const AddNewProductNoPhysicalFormPage = require('../../pageobjects/NewPeriodContractAddNewProductValidations/AddNewProductNoPhysicalForm.page')
const AddNewProductNoOriginalPackagingSizePage = require('../../pageobjects/NewPeriodContractAddNewProductValidations/AddNewProductNoOriginalPackagingSize.page')
const AddNewProductNoOriginalPackagingSizeUnitPage = require('../pageobjects/NewPeriodContractAddNewProductValidations/AddNewProductNoOriginalPackagingSizeUnit.page')
const AddNewProductNoUnitPage = require('../../pageobjects/NewPeriodContractAddNewProductValidations/AddNewProductNoUnit.page')
const AddNewProductNoSupplierPartNumberPage = require('../../pageobjects/NewPeriodContractAddNewProductValidations/AddNewProductNoSupplierPartNumber.page')
const AddNewProductNoPriceTierPage = require('../../pageobjects/NewPeriodContractAddNewProductValidations/AddNewProductNoPriceTier.page')
const NewProductPage = require('../../pageobjects/NewPeriodContractAddNewProductValidations/NewProduct.page')
const AddNewProductValidateNumbersPage = require('../../pageobjects/NewPeriodContractAddNewProductValidations/AddNewProductValidateNumbers.page')
const PrsAppConfigurationPeriodcontractManagecatalogueAddProductPage = require('../../pageobjects/NewPeriodContractAddNewProductValidations/PrsAppConfigurationPeriodcontractManagecatalogueAddProduct.page')
const PrsAppConfigurationPeriodcontractManagecatalogu2Page = require('../../pageobjects/NewPeriodContractAddNewProductValidations/PrsAppConfigurationPeriodcontractManagecatalogu2.page')

let currentValue

describe('Laboratory Materials Purchase Requisition System', () => {
  it('should execute PrsLoginPage', async () => {
    await PrsLoginPage.open()

    await (await PrsLoginPage.loginas_textInput).click() // click=0
    await (await PrsLoginPage.loginas_textInput).setValueByKeys('ANTHQ') // change=1
    await (await PrsLoginPage.login_button).click() // click=2
  })

  it('should execute PrsAppSwitchrole_01Page', async () => {
    await (await PrsAppSwitchrole_01Page.selectRole1_textInput).click() // click=3
  })

  it('should execute PrsAppHome_01Page', async () => {
    await (await PrsAppHome_01Page.configuration_link).click() // click=4
    await (await PrsAppHome_01Page.managePeriodContract_link).moveTo() // click=5
    await (await PrsAppHome_01Page.newPeriodContract_link).click() // click=7
    
  })

  it('should execute PrsAppConfigurationPeriodcontractStartPage', async () => {
	await (await PrsAppConfigurationPeriodcontractStartPage.contractStart_textInput).click() // click=8
    await (await PrsAppConfigurationPeriodcontractStartPage.contractStart_textInput).setValueByKeys('06/07/2021') // change=9
	await (await PrsAppConfigurationPeriodcontractStartPage.contractNumber_span).click()
    await (await PrsAppConfigurationPeriodcontractStartPage.contractEnd_textInput).click() // click=10
    await (await PrsAppConfigurationPeriodcontractStartPage.contractEnd_textInput).setValueByKeys('02/08/2022') // change=11
	await (await PrsAppConfigurationPeriodcontractStartPage.contractNumber_span).click()
    await (await PrsAppConfigurationPeriodcontractStartPage.others_radioInput).click() // click=12
    await (await PrsAppConfigurationPeriodcontractStartPage.others_radioInput).click() // change=13 - radioInput
    await (await PrsAppConfigurationPeriodcontractStartPage.contractNumber_textInput).click() // click=14
    await (await PrsAppConfigurationPeriodcontractStartPage.contractNumber_textInput).setValueByKeys('SIT-TEST-X1') // change=15
    await (await PrsAppConfigurationPeriodcontractStartPage.contractValue_textInput).click() // click=16
    await (await PrsAppConfigurationPeriodcontractStartPage.contractValue_textInput).setValueByKeys('100000') // change=17
    await (await PrsAppConfigurationPeriodcontractStartPage.campus_radioInput).click() // click=18
    await (await PrsAppConfigurationPeriodcontractStartPage.campus_radioInput).click() // change=19 - radioInput
    await (await PrsAppConfigurationPeriodcontractStartPage.contractDescription_text).click() // click=20
    await (await PrsAppConfigurationPeriodcontractStartPage.contractDescription_text).setValueByKeys('Test') // change=21
    await (await PrsAppConfigurationPeriodcontractStartPage.supplierselect0_textInput).click() // click=24
	await (await PrsAppConfigurationPeriodcontractStartPage.supplierselect0_textInput).setValue('ABBOTT')
    await (await PrsAppConfigurationPeriodcontractStartPage.nolabel_span).click() // click=25
    await (await PrsAppConfigurationPeriodcontractStartPage.managesupplierbutton0_button).click() // click=24
  })

  it('should execute PrsAppConfigurationPeriodcontractManagecatalogueBPage', async () => {
    await (await PrsAppConfigurationPeriodcontractManagecatalogueBPage.addNewProduct_span).click() // click=25
  })
  
  it('should validate product_withoutData', async () => {
	  await (await NewProductPage.addproductbutton_button).click()
	  await expect(await NewProductPage.nolabel_ul).toHaveTextContaining('Chemical Name is required.')
	  await expect(await NewProductPage.nolabel_ul).toHaveTextContaining('CAS Number is required.')
	  await expect(await NewProductPage.nolabel_ul).toHaveTextContaining('Manufacturer is required.')
	  await expect(await NewProductPage.nolabel_ul).toHaveTextContaining('Physical Form is required.')
	  await expect(await NewProductPage.nolabel_ul).toHaveTextContaining('Original Packaging Size is required.')
	  await expect(await NewProductPage.nolabel_ul).toHaveTextContaining('Original Packaging Size Unit is required.')
	  await expect(await NewProductPage.nolabel_ul).toHaveTextContaining('Unit is required.')
	  await expect(await NewProductPage.nolabel_ul).toHaveTextContaining('Supplier Part Number is required.')
  })

  it('should execute AddNewProductNoChemicalNamePage', async () => {
    await (await AddNewProductNoChemicalNamePage.casnumber_textInput).click() // click=26
	await (await AddNewProductNoChemicalNamePage.casnumber_textInput).setValue('1246')
    await (await AddNewProductNoChemicalNamePage._13463677_span).click() // click=27
    await (await AddNewProductNoChemicalNamePage.manufacturer_textInput).click() // click=28
	await (await AddNewProductNoChemicalNamePage.manufacturer_textInput).setValue('1ST')
    await (await AddNewProductNoChemicalNamePage._1stBase_span).click() // click=29
    await (await AddNewProductNoChemicalNamePage.productmanufacturernumber_textInput).click() // click=30
	await (await AddNewProductNoChemicalNamePage.productmanufacturernumber_textInput).setValue('08-115')
    await (await AddNewProductNoChemicalNamePage._1006652500_span).click() // click=31
    await (await AddNewProductNoChemicalNamePage.concentration_textInput).click() // click=32
    await (await AddNewProductNoChemicalNamePage.concentration_textInput).setValueByKeys('98') // change=33
    await (await AddNewProductNoChemicalNamePage.concentrationunit_select).selectByVisibleText('Grams/Cubic Metre') // change=34 - select
    await (await AddNewProductNoChemicalNamePage.grade_select).selectByVisibleText('ANALYTICAL REAGENT') // change=35 - select
    await (await AddNewProductNoChemicalNamePage.physicalForm_select).selectByVisibleText('Liquid') // change=36 - select
    await (await AddNewProductNoChemicalNamePage.originalPackagingSize_textInput).click() // click=37
    await (await AddNewProductNoChemicalNamePage.originalPackagingSize_textInput).setValueByKeys('250') // change=38
    await (await AddNewProductNoChemicalNamePage.originalquantityunit_select).selectByVisibleText('L') // change=39 - select
    await (await AddNewProductNoChemicalNamePage.unit_select).selectByVisibleText('Ea') // change=40 - select
    await (await AddNewProductNoChemicalNamePage.supplierPartNumber_textInput).click() // click=41
    await (await AddNewProductNoChemicalNamePage.supplierPartNumber_textInput).setValueByKeys('9876') // change=42
    await (await AddNewProductNoChemicalNamePage.minquantity0_textInput).click() // click=43
    await (await AddNewProductNoChemicalNamePage.minquantity0_textInput).setValueByKeys('1') // change=44
    await (await AddNewProductNoChemicalNamePage.unitprice0_textInput).click() // click=45
    await (await AddNewProductNoChemicalNamePage.unitprice0_textInput).setValueByKeys('10') // change=46
    await (await AddNewProductNoChemicalNamePage.addproductbutton_button).click() // click=47
	await expect(await AddNewProductNoChemicalNamePage.chemicalNameIsRequired_ul).toHaveTextContaining('Chemical Name is required.')
  })

  it('should execute AddNewProductNoCasNumberPage', async () => {
    await (await AddNewProductNoCasNumberPage.chemicalname_textInput).click() // click=48
	await (await AddNewProductNoCasNumberPage.chemicalname_textInput).setValue('AMETAZOLE H')
    await (await AddNewProductNoCasNumberPage.ametazoleHydrochloride_span).click() // click=49
	await (await AddNewProductNoCasNumberPage.caseClear_span).click()
    //await (await AddNewProductNoCasNumberPage.casnumber_textInput).click() // click=50
	//await (await AddNewProductNoCasNumberPage.casnumber_textInput).setValue('') 
    //await (await AddNewProductNoCasNumberPage._13463677_span).change('') // click=51
    await (await AddNewProductNoCasNumberPage.addproductbutton_button).click() // click=52
	await expect(await AddNewProductNoCasNumberPage.casNumberIsRequired_ul).toHaveTextContaining('CAS Number is required.')
  })

  it('should execute AddNewProductNoManufacturerPage', async () => {
    await (await AddNewProductNoManufacturerPage.casnumber_textInput).click() // click=53
	await (await AddNewProductNoManufacturerPage.casnumber_textInput).setValue('1246')
    await (await AddNewProductNoManufacturerPage._13463677_span).click() // click=54
	await (await AddNewProductNoManufacturerPage.clearManuf_span).click()
    await (await AddNewProductNoManufacturerPage.addproductbutton_button).click() // click=55
	await expect(await AddNewProductNoManufacturerPage.manufacturerIsRequired_ul).toHaveTextContaining('Manufacturer is required.')
  })

  it('should execute AddNewProductNoPhysicalFormPage', async () => {
    await (await AddNewProductNoPhysicalFormPage.manufacturer_textInput).click() // click=56
	await (await AddNewProductNoPhysicalFormPage.manufacturer_textInput).setValue('1ST BASE')
    await (await AddNewProductNoPhysicalFormPage.ad4de32b6da75_div).click() // click=57
    await (await AddNewProductNoPhysicalFormPage.physicalForm_select).selectByVisibleText('Please Select') // change=58 - select
    await (await AddNewProductNoPhysicalFormPage.addproductbutton_button).click() // click=59
	await expect(await AddNewProductNoPhysicalFormPage.physicalFormIsRequired_ul).toHaveTextContaining('Physical Form is required.')
  })

  it('should execute AddNewProductNoOriginalPackagingSizePage', async () => {
    await (await AddNewProductNoOriginalPackagingSizePage.physicalForm_select).selectByVisibleText('Liquid') // change=60 - select
    await (await AddNewProductNoOriginalPackagingSizePage.originalPackagingSize_textInput).click() // click=61
    await (await AddNewProductNoOriginalPackagingSizePage.originalPackagingSize_textInput).setValueByKeys('') // change=62
	await (await AddNewProductNoOriginalPackagingSizePage.originalquantityunit_select).selectByVisibleText('L')
    await (await AddNewProductNoOriginalPackagingSizePage.addproductbutton_button).click() // click=63
	await expect(await AddNewProductNoOriginalPackagingSizePage.packagingSizeIsRequired_ul).toHaveTextContaining('Original Packaging Size is required.')
  })

  it('should execute AddNewProductNoOriginalPackagingSizeUnitPage', async () => {
    await (await AddNewProductNoOriginalPackagingSizeUnitPage.originalPackagingSize_textInput).click() // click=64
    await (await AddNewProductNoOriginalPackagingSizeUnitPage.originalPackagingSize_textInput).setValueByKeys('500') // change=65
    await (await AddNewProductNoOriginalPackagingSizeUnitPage.originalquantityunit_select).selectByVisibleText('Please Select') // change=66 - select
    await (await AddNewProductNoOriginalPackagingSizeUnitPage.addproductbutton_button).click() // click=67
	await expect(await AddNewProductNoOriginalPackagingSizeUnitPage.packagingUnitIsRequired_ul).toHaveTextContaining('Original Packaging Size Unit is required.')
  })

  it('should execute AddNewProductNoUnitPage', async () => {
	await (await AddNewProductNoUnitPage.originalquantityunit_select).selectByVisibleText('L')
    await (await AddNewProductNoUnitPage.unit_select).selectByVisibleText('Please Select') // change=68 - select
    await (await AddNewProductNoUnitPage.addproductbutton_button).click() // click=69
	await expect(await AddNewProductNoUnitPage.unitIsRequired_ul).toHaveTextContaining('Unit is required.')
  })

  it('should execute AddNewProductNoSupplierPartNumberPage', async () => {
	await (await AddNewProductNoSupplierPartNumberPage.unit_select).selectByVisibleText('Ea') // change=73 - select
    await (await AddNewProductNoSupplierPartNumberPage.supplierPartNumber_div).click() // click=70
    await (await AddNewProductNoSupplierPartNumberPage.supplierPartNumber_textInput).setValueByKeys('') // change=71
    await (await AddNewProductNoSupplierPartNumberPage.addproductbutton_button).click() // click=72
	await expect(await AddNewProductNoSupplierPartNumberPage.supplierIsRequired_ul).toHaveTextContaining('Supplier Part Number is required.')
  })

  it('should execute AddNewProductNoPriceTierPage', async () => {
	await (await AddNewProductNoPriceTierPage.supplierPartNumber_textInput).click() // click=83
    await (await AddNewProductNoPriceTierPage.supplierPartNumber_textInput).setValueByKeys('9876') // change=84
	
    await (await AddNewProductNoPriceTierPage.minquantity0_textInput).click() // click=80
	await (await AddNewProductNoPriceTierPage.minquantity0_textInput).setValueByKeys('') // change=87
    await (await AddNewProductNoPriceTierPage.unitprice0_textInput).click() // click=81
	await (await AddNewProductNoPriceTierPage.unitprice0_textInput).setValueByKeys('') // change=92
    await (await AddNewProductNoPriceTierPage.addproductbutton_button).click() // click=82
    
    await (await AddNewProductNoPriceTierPage.minquantity0_textInput).click() // click=86
	await (await AddNewProductNoPriceTierPage.minquantity0_textInput).setValueByKeys('1') // change=87
    await (await AddNewProductNoPriceTierPage.addproductbutton_button).click() // click=88
	
    //await (await AddNewProductNoPriceTierPage._1na_tr).click() // click=89
	await (await AddNewProductNoPriceTierPage.minquantity0_textInput).click()
    await (await AddNewProductNoPriceTierPage.minquantity0_textInput).setValueByKeys('') // change=90
    await (await AddNewProductNoPriceTierPage.unitprice0_textInput).click() // click=91
	await (await AddNewProductNoPriceTierPage.unitprice0_textInput).setValueByKeys('10')   
    await (await AddNewProductNoPriceTierPage.addproductbutton_button).click() // click=93
  })
  
  it('should execute AddNewProductValidateNumericFields', async () => {
	  await (await AddNewProductValidateNumbersPage.concentration_textInput).click()
	  await (await AddNewProductValidateNumbersPage.concentration_textInput).setValueByKeys('a!b')
	  const concentration = await (await AddNewProductValidateNumbersPage.concentration_textInput).getValue()
	  console.log("concentration "+concentration);
	  await expect(concentration).not.toBe('a!b')
	  
	  await (await AddNewProductValidateNumbersPage.originalPackagingSize_textInput).click()
	  await (await AddNewProductValidateNumbersPage.originalPackagingSize_textInput).setValueByKeys('a')
	  const pckgSize = await (await AddNewProductValidateNumbersPage.originalPackagingSize_textInput).getValue()
	  console.log("pckgSize "+pckgSize);
	  await expect(pckgSize).not.toBe('a')
	  
	  await (await AddNewProductValidateNumbersPage.unit_select).selectByVisibleText('Box')
	  await (await AddNewProductValidateNumbersPage.noOfItemsInBox_textInput).click()
	  await (await AddNewProductValidateNumbersPage.noOfItemsInBox_textInput).setValueByKeys('a')	  
	  const noItemInBox = await (await AddNewProductValidateNumbersPage.noOfItemsInBox_textInput).getValue()
	  console.log("noItemInBox "+noItemInBox);
	  await expect(noItemInBox).not.toBe('a')
	  
	await (await AddNewProductValidateNumbersPage.minquantity0_textInput).click() // click=80
	await (await AddNewProductValidateNumbersPage.minquantity0_textInput).setValueByKeys('a') // change=87
	const minQ = await (await AddNewProductValidateNumbersPage.minquantity0_textInput).getValue()
	await expect(minQ).not.toBe('a')
	
    await (await AddNewProductValidateNumbersPage.unitprice0_textInput).click() // click=81
	await (await AddNewProductValidateNumbersPage.unitprice0_textInput).setValueByKeys('a') // change=92
	const unitP = await (await AddNewProductValidateNumbersPage.unitprice0_textInput).getValue()
	await expect(unitP).not.toBe('a')
	  
	  //await (await AddNewProductValidateNumbersPage.addproductbutton_button).click()
  })
  
  
  it('should execute Concentration3DecimalPoints', async () => {
	  await (await AddNewProductValidateNumbersPage.unitprice0_textInput).click()
	  await (await AddNewProductValidateNumbersPage.unitprice0_textInput).setValueByKeys('1.5')
	  await (await AddNewProductValidateNumbersPage.minquantity0_textInput).click()
	  await (await AddNewProductValidateNumbersPage.minquantity0_textInput).setValueByKeys('2')
	  await (await AddNewProductValidateNumbersPage.originalPackagingSize_textInput).click() // click=81
	  await (await AddNewProductValidateNumbersPage.originalPackagingSize_textInput).setValueByKeys('10') // change=92
	  await (await AddNewProductValidateNumbersPage.concentration_textInput).click()
	  await (await AddNewProductValidateNumbersPage.concentration_textInput).setValueByKeys('1.1123')
	  await (await AddNewProductValidateNumbersPage.concentrationunit_select).selectByVisibleText('Grams/Cubic Metre')
	  
	  await (await AddNewProductValidateNumbersPage.addproductbutton_button).click()
	  await expect(await AddNewProductValidateNumbersPage.errorMessage).toHaveTextContaining('Concentration must be up to 3 decimal places.')
  })
  
  it('should execute OriginalPackagingSizeDecimalPoints', async () => {
	  await (await AddNewProductValidateNumbersPage.originalPackagingSize_textInput).click()
	  await (await AddNewProductValidateNumbersPage.originalPackagingSize_textInput).setValueByKeys('1.1123')
	  await (await AddNewProductValidateNumbersPage.addproductbutton_button).click() 
	  await expect(await AddNewProductValidateNumbersPage.errorMessage).toHaveTextContaining('Original Packaging Size must be up to 3 decimal places.')	  
  })
  

  
  it('should execute UnitPriceDecimalPoints', async () => {
	  await (await AddNewProductValidateNumbersPage.unitprice0_textInput).click()
	  await (await AddNewProductValidateNumbersPage.unitprice0_textInput).setValueByKeys('1.1123')
	  await (await AddNewProductValidateNumbersPage.addproductbutton_button).click()  
	  await expect(await AddNewProductValidateNumbersPage.errorMessage).toHaveTextContaining('Per Unit Price must be up to 3 decimal places.')
  })
  
  
  it('should execute CancelButton', async () => {
	  await (await AddNewProductValidateNumbersPage.cancelbutton_button).click()
	  await (await PrsAppConfigurationPeriodcontractManagecatalogu2Page.addnewproductbutton_button).click()
  })
  
  it('should validate existingProduct', async () =>  {
	await (await PrsAppConfigurationPeriodcontractManagecatalogueAddProductPage.chemicalname_textInput).click() // click=26
	await (await PrsAppConfigurationPeriodcontractManagecatalogueAddProductPage.chemicalname_textInput).setValue('PENTANE')
	await (await PrsAppConfigurationPeriodcontractManagecatalogueAddProductPage.ametazoleHydrochloride_span).click()
	await (await PrsAppConfigurationPeriodcontractManagecatalogueAddProductPage.casnumber_textInput).click() // click=26
	await (await PrsAppConfigurationPeriodcontractManagecatalogueAddProductPage.casnumber_textInput).setValue('109-66-0')
    await (await PrsAppConfigurationPeriodcontractManagecatalogueAddProductPage._13463677_span).click() // click=27
    await (await PrsAppConfigurationPeriodcontractManagecatalogueAddProductPage.manufacturer_textInput).click() // click=28
	await (await PrsAppConfigurationPeriodcontractManagecatalogueAddProductPage.manufacturer_textInput).setValue('TEDIA')
    await (await PrsAppConfigurationPeriodcontractManagecatalogueAddProductPage._1stBase_span).click() // click=29
    await (await PrsAppConfigurationPeriodcontractManagecatalogueAddProductPage.productmanufacturernumber_textInput).click() // click=30
	await (await PrsAppConfigurationPeriodcontractManagecatalogueAddProductPage.productmanufacturernumber_textInput).setValue('PR1412-048')
    await (await PrsAppConfigurationPeriodcontractManagecatalogueAddProductPage._1006652500_span).click() // click=31
    await (await PrsAppConfigurationPeriodcontractManagecatalogueAddProductPage.physicalForm_select).selectByVisibleText('Liquid') // change=36 - select
    await (await PrsAppConfigurationPeriodcontractManagecatalogueAddProductPage.originalPackagingSize_textInput).click() // click=37
    await (await PrsAppConfigurationPeriodcontractManagecatalogueAddProductPage.originalPackagingSize_textInput).setValueByKeys('4') // change=38
    await (await PrsAppConfigurationPeriodcontractManagecatalogueAddProductPage.originalquantityunit_select).selectByVisibleText('L') // change=39 - select
    await (await PrsAppConfigurationPeriodcontractManagecatalogueAddProductPage.unit_select).selectByVisibleText('Ea') // change=40 - select
    await (await PrsAppConfigurationPeriodcontractManagecatalogueAddProductPage.supplierPartNumber_textInput).click() // click=41
    await (await PrsAppConfigurationPeriodcontractManagecatalogueAddProductPage.supplierPartNumber_textInput).setValueByKeys('SP000009') // change=42
    await (await PrsAppConfigurationPeriodcontractManagecatalogueAddProductPage.minquantity0_textInput).click() // click=43
    await (await PrsAppConfigurationPeriodcontractManagecatalogueAddProductPage.minquantity0_textInput).setValueByKeys('1') // change=44
    await (await PrsAppConfigurationPeriodcontractManagecatalogueAddProductPage.unitprice0_textInput).click() // click=45
    await (await PrsAppConfigurationPeriodcontractManagecatalogueAddProductPage.unitprice0_textInput).setValueByKeys('10') // change=46
    await (await PrsAppConfigurationPeriodcontractManagecatalogueAddProductPage.addproductbutton_button).click() // click=47
  })
})
