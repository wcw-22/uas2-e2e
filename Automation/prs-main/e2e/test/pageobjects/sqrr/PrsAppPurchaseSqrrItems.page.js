const Page = require('../Page')

class PrsAppPurchaseSqrrItemsPage extends Page {
  get errorDiv () { return $('DIV.alert.alert-danger') }

  get nextButton () { return $('#nextButton') }
  get saveAsDraftButton () { return $('#saveAsDraftButton') }

  addSqrrLineItemButton(idx) { return $('#addSqrrLineItemButton-' + idx) }
  removeLineItemButton(idx) { return $('#removeLineItemButton-' + idx) }
  lineItemDiv(idx) { return $('#line-item-' + idx) }

  originalQuantityUnitSelect (idx) { return $('#originalQuantityUnit-' + idx) }
  originalQuantityCodeSelect (idx) { return $('#originalQuantityCode-' + idx) }
  originalQuantityInput (idx) { return $('#originalQuantity-' + idx) }
  priceInput (idx) { return $('#price_' + idx) }
  quantityInput (idx) { return $('#quantity_' + idx) }
  quantityPerUnitInput (idx) { return $('#quantityPerUnit_' + idx) }
  productManufacturerNumberInput (idx) { return $('#productManufacturerNumber-' + idx) }
  concentrationInput (idx) { return $('#concentration-' + idx) }
  concentrationUnitSelect (idx) { return $('#concentrationUnit-' + idx) }
  chemicalGradeSelect (idx) { return $('#chemicalGrade-' + idx) }
  unitSelect (idx) { return $('#unit_' + idx) }
  currencySelect (idx) { return $('#currencyCode-' + idx) }
  productDescriptionInput (idx) { return $('#productDescription-' + idx) }
  physicalFormSelect (idx) { return $('#physicalFormCode-' + idx) }
  additionalChargeInput (idx) { return $('#additional-charge-' + idx) }

  manufacturerTextInput (idx) { return $('#manufacturer-' + idx) }
  get firstManufacturerSpan () { return $('NG-DROPDOWN-PANEL > DIV.scroll-host > DIV:nth-of-type(2) > DIV:nth-of-type(1) > SPAN') }

  supplierTextInput (idx) { return $('#lineItemSupplier-' + idx) }
  get firstSupplierSpan () { return $('NG-DROPDOWN-PANEL > DIV.scroll-host > DIV:nth-of-type(2) > DIV:nth-of-type(1) > SPAN') }

  get downpaymentCategory() { return $('#downpaymentCategory') }
  downpaymentPercentageInput (idx) { return $('#downpaymentPct_' + idx) }
  downpaymentAmountInput (idx) { return $('#downpaymentAmt_' + idx) }
  downpaymentDueDateInput (idx) { return $('#downpaymentDue_' + idx) }

  notationTypeReal(idx, row, label) { return $('#notationType-real-' + label + '-' + idx + '-' + row) }
  notationTypeScientific(idx, row, label) { return $('#notationType-scientific-' + label + '-' + idx + '-' + row) }

  notationTypeRealInput(idx, row, label) { return $('#notationType-real-input-' + label + '-' + idx + '-' + row) }
  notationTypeUnitSelect(idx, row, label) { return $('#notationType-unit-' + label + '-' + idx + '-' + row) }

  notationTypeScientificCoefficientInput(idx, row, label) { return $('#notationType-scientific-coef-' + label + '-' + idx + '-' + row) }
  notationTypeScientificExponentInput(idx, row, label) { return $('#notationType-scientific-exponent-' + label + '-' + idx + '-' + row) }

  bioNotationTypeReal(idx, label) { return $('#notationType-real-' + label + '-' + idx) }
  bioNotationTypeScientific(idx, label) { return $('#notationType-scientific-' + label + '-' + idx) }

  bioNotationTypeRealInput(idx, label) { return $('#notationType-real-input-' + label + '-' + idx) }
  bioNotationTypeUnitSelect(idx, label) { return $('#notationType-unit-' + label + '-' + idx) }

  bioNotationTypeScientificCoefficientInput(idx, label) { return $('#notationType-scientific-coef-' + label + '-' + idx) }
  bioNotationTypeScientificExponentInput(idx, label) { return $('#notationType-scientific-exponent-' + label + '-' + idx) }

  geneticallyModifiedSelect (idx) { return $('#geneticallyModified-' + idx) }
  productFormatSelect (idx) { return $('#productFormat-' + idx) }
  bioSafetyLevelSelect (idx) { return $('#safetyLevelCode-' + idx) }

  subTotalSpan(idx) { return $('#line-item-' + idx + ' app-fragment-lineitem-subtotal > div:nth-child(1) > div.col-sm-3.text-left > span') }
  sqrrQuantityTd(idx) { return $('#prs-content-container > app-purchase-new > app-sqrr-items > div > div.desktop-min-content-height > div:nth-child(2) > div > div > div.panel-body > div > table > tbody > tr:nth-child(' + (idx + 1) + ') > td:nth-child(3)') }

} // end of class PrsAppPurchaseSqrrItemsPage

module.exports = new PrsAppPurchaseSqrrItemsPage();

