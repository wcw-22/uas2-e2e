
/*** Generated spec file ***/
const PrsLoginPage = require('../../pageobjects/searchUserAccessAdmin/PrsLogin.page')
const PrsAppSwitchrolePage = require('../../pageobjects/searchUserAccessAdmin/PrsAppSwitchrole.page')
const PrsAppHome_02Page = require('../../pageobjects/searchUserAccessAdmin/PrsAppHome_02.page')
let currentValue

describe('Laboratory Materials Purchase Requisition System', () => {
  it('should execute PrsLoginPage', async () => {
    await PrsLoginPage.open()

    await (await PrsLoginPage.loginas_textInput).click() // click=0
    await (await PrsLoginPage.loginas_textInput).setValueByKeys('elckmy') // change=1
    await (await PrsLoginPage.login_button).click() // click=2
  })

  it('should execute PrsAppSwitchrolePage', async () => {
    await (await PrsAppSwitchrolePage.selectRole0_textInput).click() // click=3
  })

  it('should execute PrsAppHome_02Page', async () => {
    await (await PrsAppHome_02Page.configuration_link).click() 
    await (await PrsAppHome_02Page.manageUserAccess_link).moveTo()
    await (await PrsAppHome_02Page.searchUserAccess_link).click()
  })
  
  it('should execute PrsAppHome_02Page to validate empty search criteria', async () => {
    await (await PrsAppHome_02Page.searchbutton_button).click() 
    await expect(await PrsAppHome_02Page.validation_error_li).toHaveTextContaining('Please enter a criteria to perform the search.') 
    await (await PrsAppHome_02Page.validation_error_li).click() 
  })

  it('should execute PrsAppHome_02Page to validate Name Field 1', async () => {
	await (await PrsAppHome_02Page.manageUserAccessSearch_span).click();
	await (await PrsAppHome_02Page.name_textInput).click()
	await (await PrsAppHome_02Page.name_textInput).setValueByKeys('Aurora Leblanc')
    await (await PrsAppHome_02Page.searchbutton_button).click()
	await (await PrsAppHome_02Page.result_count_div).click()
    await expect(await PrsAppHome_02Page.result_count_div).toHaveTextContaining('1 rows') 
  })
  
  it('should execute PrsAppHome_02Page to validate Name Field 2', async () => {
	await (await PrsAppHome_02Page.manageUserAccessSearch_span).click();
	await (await PrsAppHome_02Page.name_textInput).click()
	await (await PrsAppHome_02Page.name_textInput).setValueByKeys('Aurora Leblancs')
    await (await PrsAppHome_02Page.searchbutton_button).click() 
    await (await PrsAppHome_02Page.noRecordsFound_p).click()
	await expect(await PrsAppHome_02Page.noRecordsFound_p).toHaveTextContaining('No records found.') 
  })
  
  it('should execute PrsAppHome_02Page to clean data', async () => {
	await (await PrsAppHome_02Page.manageUserAccessSearch_span).click();
	await (await PrsAppHome_02Page.name_textInput).click()
	await (await PrsAppHome_02Page.name_textInput).setValueByKeys('')
  })   

  it('should execute PrsAppHome_02Page to validate NUSNET ID Field 1', async () => {
	await (await PrsAppHome_02Page.manageUserAccessSearch_span).click();
	await (await PrsAppHome_02Page.nusnetId_textInput).click()
    await (await PrsAppHome_02Page.nusnetId_textInput).setValueByKeys('ELCKMY')
    await (await PrsAppHome_02Page.searchbutton_button).click()
	await (await PrsAppHome_02Page.result_count_div).click()
    await expect(await PrsAppHome_02Page.result_count_div).toHaveTextContaining('16 rows') 
  })
  
  it('should execute PrsAppHome_02Page to validate NUSNET ID Field 2', async () => {
	await (await PrsAppHome_02Page.manageUserAccessSearch_span).click();
	await (await PrsAppHome_02Page.nusnetId_textInput).click()
    await (await PrsAppHome_02Page.nusnetId_textInput).setValueByKeys('TESTNUSID')
    await (await PrsAppHome_02Page.searchbutton_button).click() 
    await (await PrsAppHome_02Page.noRecordsFound_p).click()
	await expect(await PrsAppHome_02Page.noRecordsFound_p).toHaveTextContaining('No records found.') 
  })
  
  it('should execute PrsAppHome_02Page to clean data', async () => {
	await (await PrsAppHome_02Page.manageUserAccessSearch_span).click();
	await (await PrsAppHome_02Page.nusnetId_textInput).click()
	await (await PrsAppHome_02Page.nusnetId_textInput).setValueByKeys('')
  })  

  it('should execute PrsAppHome_02Page to validate ALL role Viewer result count', async () => {
	await (await PrsAppHome_02Page.manageUserAccessSearch_span).click();
    await (await PrsAppHome_02Page.role_select).selectByVisibleText('Viewer') 
	await (await PrsAppHome_02Page.all_radioInput).click() 
    await (await PrsAppHome_02Page.all_radioInput).click()
    await (await PrsAppHome_02Page.searchbutton_button).click() 
	await expect(await PrsAppHome_02Page.result_count_div).toHaveTextContaining('20 rows') 
    await (await PrsAppHome_02Page.result_count_div).click() 
  })
  
  it('should execute PrsAppHome_02Page to validate Active role Viewer result count', async () => {
	await (await PrsAppHome_02Page.manageUserAccessSearch_span).click();
    await (await PrsAppHome_02Page.role_select).selectByVisibleText('Viewer') 
	await (await PrsAppHome_02Page.active_radioInput).click() 
    await (await PrsAppHome_02Page.active_radioInput).click()
    await (await PrsAppHome_02Page.searchbutton_button).click() 
	await expect(await PrsAppHome_02Page.result_count_div).toHaveTextContaining('13 rows') 
    await (await PrsAppHome_02Page.result_count_div).click() 
  })
  
  it('should execute PrsAppHome_02Page to validate inactive role Viewer result count', async () => {
	await (await PrsAppHome_02Page.manageUserAccessSearch_span).click();
    await (await PrsAppHome_02Page.role_select).selectByVisibleText('Viewer') 
	await (await PrsAppHome_02Page.inactive_radioInput).click() 
    await (await PrsAppHome_02Page.inactive_radioInput).click()
    await (await PrsAppHome_02Page.searchbutton_button).click() 
	await expect(await PrsAppHome_02Page.result_count_div).toHaveTextContaining('7 rows') 
    await (await PrsAppHome_02Page.result_count_div).click() 
  })
  
  it('should execute PrsAppHome_02Page to clean data', async () => {
	await (await PrsAppHome_02Page.role_select).selectByVisibleText('Please Select') 
  })
  
  it('should execute PrsAppHome_02Page to validate ALL - role Viewer - Name result count 1', async () => {
	await (await PrsAppHome_02Page.manageUserAccessSearch_span).click();
	await (await PrsAppHome_02Page.name_textInput).click()
	await (await PrsAppHome_02Page.name_textInput).setValueByKeys('Aurora Leblancs')
    await (await PrsAppHome_02Page.role_select).selectByVisibleText('Viewer') 
	await (await PrsAppHome_02Page.all_radioInput).click() 
    await (await PrsAppHome_02Page.all_radioInput).click()
    await (await PrsAppHome_02Page.searchbutton_button).click() 
	await (await PrsAppHome_02Page.noRecordsFound_p).click()
	await expect(await PrsAppHome_02Page.noRecordsFound_p).toHaveTextContaining('No records found.')
  })
  
  it('should execute PrsAppHome_02Page to validate ALL - role Viewer - Name result count 2', async () => {
	await (await PrsAppHome_02Page.manageUserAccessSearch_span).click();
	await (await PrsAppHome_02Page.name_textInput).click()
	await (await PrsAppHome_02Page.name_textInput).setValueByKeys('Osvaldo Watkins')
    await (await PrsAppHome_02Page.role_select).selectByVisibleText('Viewer') 
	await (await PrsAppHome_02Page.all_radioInput).click() 
    await (await PrsAppHome_02Page.all_radioInput).click()
	await (await PrsAppHome_02Page.searchbutton_button).click() 
	await expect(await PrsAppHome_02Page.result_count_div).toHaveTextContaining('2 rows')
    await (await PrsAppHome_02Page.result_count_div).click() 
  })
  
  it('should execute PrsAppHome_02Page to validate ALL - role Viewer - Name result count 3', async () => {
	await (await PrsAppHome_02Page.manageUserAccessSearch_span).click();
	await (await PrsAppHome_02Page.name_textInput).click()
	await (await PrsAppHome_02Page.name_textInput).setValueByKeys('TESTName')
    await (await PrsAppHome_02Page.role_select).selectByVisibleText('Viewer') 
	await (await PrsAppHome_02Page.all_radioInput).click() 
    await (await PrsAppHome_02Page.all_radioInput).click()
	await (await PrsAppHome_02Page.searchbutton_button).click()
	await (await PrsAppHome_02Page.noRecordsFound_p).click()
	await expect(await PrsAppHome_02Page.noRecordsFound_p).toHaveTextContaining('No records found.')
  })
  
  it('should execute PrsAppHome_02Page to validate ALL - role Viewer - Name -NUSNET ID result 1', async () => {
	await (await PrsAppHome_02Page.manageUserAccessSearch_span).click();
	await (await PrsAppHome_02Page.name_textInput).click()
	await (await PrsAppHome_02Page.name_textInput).setValueByKeys('Osvaldo Watkins')
	await (await PrsAppHome_02Page.manageUserAccessSearch_span).click();
	await (await PrsAppHome_02Page.nusnetId_textInput).click()
    await (await PrsAppHome_02Page.nusnetId_textInput).setValueByKeys('TESTNUSID')
    await (await PrsAppHome_02Page.role_select).selectByVisibleText('Viewer') 
	await (await PrsAppHome_02Page.all_radioInput).click() 
    await (await PrsAppHome_02Page.all_radioInput).click()
	await (await PrsAppHome_02Page.searchbutton_button).click() 
	await (await PrsAppHome_02Page.noRecordsFound_p).click()
	await expect(await PrsAppHome_02Page.noRecordsFound_p).toHaveTextContaining('No records found.')
  })
  
  it('should execute PrsAppHome_02Page to validate ALL - role Viewer - Name -NUSNET ID result 2', async () => {
	await (await PrsAppHome_02Page.manageUserAccessSearch_span).click();
	await (await PrsAppHome_02Page.name_textInput).click()
	await (await PrsAppHome_02Page.name_textInput).setValueByKeys('Osvaldo Watkins')
	await (await PrsAppHome_02Page.manageUserAccessSearch_span).click();
	await (await PrsAppHome_02Page.nusnetId_textInput).click()
    await (await PrsAppHome_02Page.nusnetId_textInput).setValueByKeys('CHMSJUN')
    await (await PrsAppHome_02Page.role_select).selectByVisibleText('Viewer') 
	await (await PrsAppHome_02Page.all_radioInput).click() 
    await (await PrsAppHome_02Page.all_radioInput).click()
	await (await PrsAppHome_02Page.searchbutton_button).click() 
	await (await PrsAppHome_02Page.noRecordsFound_p).click()
	await expect(await PrsAppHome_02Page.noRecordsFound_p).toHaveTextContaining('No records found.')
  })
  
  it('should execute PrsAppHome_02Page to validate ALL - role Viewer - Name -NUSNET ID result 3', async () => {
	await (await PrsAppHome_02Page.manageUserAccessSearch_span).click();
	await (await PrsAppHome_02Page.name_textInput).click()
	await (await PrsAppHome_02Page.name_textInput).setValueByKeys('Osvaldo Watkins')
	await (await PrsAppHome_02Page.manageUserAccessSearch_span).click();
	await (await PrsAppHome_02Page.nusnetId_textInput).click()
    await (await PrsAppHome_02Page.nusnetId_textInput).setValueByKeys('ELCKMY')
    await (await PrsAppHome_02Page.role_select).selectByVisibleText('Viewer') 
	await (await PrsAppHome_02Page.all_radioInput).click() 
    await (await PrsAppHome_02Page.all_radioInput).click()
    await (await PrsAppHome_02Page.searchbutton_button).click()
	await expect(await PrsAppHome_02Page.result_count_div).toHaveTextContaining('2 rows')
    await (await PrsAppHome_02Page.result_count_div).click()
  })
  
/*   it('should execute PrsAppHome_02Page to validate with faculty Viewers', async () => {
	await (await PrsAppHome_02Page.manageUserAccessSearch_span).click();
	await (await PrsAppHome_02Page.name_textInput).click()
	await (await PrsAppHome_02Page.name_textInput).setValueByKeys('Osvaldo Watkins')
	await (await PrsAppHome_02Page.nusnetId_textInput).click()
    await (await PrsAppHome_02Page.nusnetId_textInput).setValueByKeys('ELCKMY')
    await (await PrsAppHome_02Page.role_select).selectByVisibleText('Viewer') 
	await (await PrsAppHome_02Page.all_radioInput).click() 
    await (await PrsAppHome_02Page.all_radioInput).click()
	await (await PrsAppHome_02Page.facultyRirc_select).selectByVisibleText('Science')
    await (await PrsAppHome_02Page.searchbutton_button).click()
	await expect(await PrsAppHome_02Page.result_count_div).toHaveTextContaining('4 rows')
    await (await PrsAppHome_02Page.result_count_div).click()
  }) */
  
  it('should execute PrsAppHome_02Page to clean data', async () => {
	await (await PrsAppHome_02Page.name_textInput).click()
	await (await PrsAppHome_02Page.name_textInput).setValueByKeys('')
	await (await PrsAppHome_02Page.nusnetId_textInput).click()
    await (await PrsAppHome_02Page.nusnetId_textInput).setValueByKeys('')
  })
  
  it('should execute PrsAppHome_02Page to validate with faculty Viewers 1', async () => {
	await (await PrsAppHome_02Page.manageUserAccessSearch_span).click();
    await (await PrsAppHome_02Page.role_select).selectByVisibleText('Viewer') 
	await (await PrsAppHome_02Page.all_radioInput).click() 
    await (await PrsAppHome_02Page.all_radioInput).click()
	await (await PrsAppHome_02Page.facultyRirc_select).selectByVisibleText('Science')
    await (await PrsAppHome_02Page.searchbutton_button).click()
	await expect(await PrsAppHome_02Page.result_count_div).toHaveTextContaining('3 rows')
    await (await PrsAppHome_02Page.result_count_div).click()
  })
  
  it('should execute PrsAppHome_02Page to validate with faculty Viewers 2', async () => {
	await (await PrsAppHome_02Page.manageUserAccessSearch_span).click();
    await (await PrsAppHome_02Page.role_select).selectByVisibleText('Viewer') 
	await (await PrsAppHome_02Page.all_radioInput).click() 
    await (await PrsAppHome_02Page.all_radioInput).click()
	await (await PrsAppHome_02Page.facultyRirc_select).selectByVisibleText('Arts & Social Sciences') // fac code = 31
    await (await PrsAppHome_02Page.searchbutton_button).click()
	await expect(await PrsAppHome_02Page.result_count_div).toHaveTextContaining('7 rows')
    await (await PrsAppHome_02Page.result_count_div).click()
  })
  
  it('should execute PrsAppHome_02Page to validate with faculty Viewers 3', async () => {
	await (await PrsAppHome_02Page.manageUserAccessSearch_span).click();
    await (await PrsAppHome_02Page.role_select).selectByVisibleText('Viewer') 
	await (await PrsAppHome_02Page.active_radioInput).click() 
    await (await PrsAppHome_02Page.active_radioInput).click()
	await (await PrsAppHome_02Page.facultyRirc_select).selectByVisibleText('Arts & Social Sciences') // fac code = 31
    await (await PrsAppHome_02Page.searchbutton_button).click()
	await expect(await PrsAppHome_02Page.result_count_div).toHaveTextContaining('4 rows')
    await (await PrsAppHome_02Page.result_count_div).click()
  })
  
  it('should execute PrsAppHome_02Page to validate with faculty Viewers 4', async () => {
	await (await PrsAppHome_02Page.manageUserAccessSearch_span).click();
    await (await PrsAppHome_02Page.role_select).selectByVisibleText('Viewer') 
	await (await PrsAppHome_02Page.inactive_radioInput).click() 
    await (await PrsAppHome_02Page.inactive_radioInput).click()
	await (await PrsAppHome_02Page.facultyRirc_select).selectByVisibleText('Arts & Social Sciences') // fac code = 31
    await (await PrsAppHome_02Page.searchbutton_button).click()
	await expect(await PrsAppHome_02Page.result_count_div).toHaveTextContaining('3 rows')
    await (await PrsAppHome_02Page.result_count_div).click()
  })
  
  it('should execute PrsAppHome_02Page to validate with faculty Department Viewers 1', async () => {
	await (await PrsAppHome_02Page.manageUserAccessSearch_span).click();
    await (await PrsAppHome_02Page.role_select).selectByVisibleText('Viewer') 
	await (await PrsAppHome_02Page.all_radioInput).click() 
    await (await PrsAppHome_02Page.all_radioInput).click()
	await (await PrsAppHome_02Page.facultyRirc_select).selectByVisibleText('Please select')
	await (await PrsAppHome_02Page.facultyRirc_select).selectByVisibleText('Arts & Social Sciences') // fac code = 31
    await (await PrsAppHome_02Page.departmentLeftSelect_select).selectByVisibleText('Chinese Studies') // Dept Code = 102
    await (await PrsAppHome_02Page.searchbutton_button).click()
	await expect(await PrsAppHome_02Page.result_count_div).toHaveTextContaining('1 rows')
    await (await PrsAppHome_02Page.result_count_div).click()
  })
  
  it('should execute PrsAppHome_02Page to validate with faculty Department Viewers 2', async () => {
	await (await PrsAppHome_02Page.manageUserAccessSearch_span).click();
    await (await PrsAppHome_02Page.role_select).selectByVisibleText('Viewer') 
	await (await PrsAppHome_02Page.all_radioInput).click() 
    await (await PrsAppHome_02Page.all_radioInput).click()
	await (await PrsAppHome_02Page.facultyRirc_select).selectByVisibleText('Please select')
	await (await PrsAppHome_02Page.facultyRirc_select).selectByVisibleText('Arts & Social Sciences') // fac code = 31
    await (await PrsAppHome_02Page.departmentLeftSelect_select).selectByVisibleText('Centre For Language Studies') // Dept Code = 127
    await (await PrsAppHome_02Page.searchbutton_button).click()
	await expect(await PrsAppHome_02Page.result_count_div).toHaveTextContaining('3 rows')
    await (await PrsAppHome_02Page.result_count_div).click()
  })
  
  it('should execute PrsAppHome_02Page to validate with faculty Department Viewers 3', async () => {
	await (await PrsAppHome_02Page.manageUserAccessSearch_span).click();
    await (await PrsAppHome_02Page.role_select).selectByVisibleText('Viewer') 
	await (await PrsAppHome_02Page.all_radioInput).click() 
    await (await PrsAppHome_02Page.all_radioInput).click()
	await (await PrsAppHome_02Page.facultyRirc_select).selectByVisibleText('Please select')
	await (await PrsAppHome_02Page.facultyRirc_select).selectByVisibleText('Arts & Social Sciences') // fac code = 31
    await (await PrsAppHome_02Page.departmentLeftSelect_select).selectByVisibleText('Communications And New Media') 
    await (await PrsAppHome_02Page.searchbutton_button).click()
	await (await PrsAppHome_02Page.noRecordsFound_p).click()
	await expect(await PrsAppHome_02Page.noRecordsFound_p).toHaveTextContaining('No records found.')
  })

  it('should execute PrsAppHome_02Page to validate with faculty', async () => {
	await (await PrsAppHome_02Page.manageUserAccessSearch_span).click();
	await (await PrsAppHome_02Page.name_textInput).click()
	await (await PrsAppHome_02Page.name_textInput).setValueByKeys('Osvaldo Watkins')
	await (await PrsAppHome_02Page.nusnetId_textInput).click()
    await (await PrsAppHome_02Page.nusnetId_textInput).setValueByKeys('ELCKMY')
    await (await PrsAppHome_02Page.role_select).selectByVisibleText('Viewer') 
	await (await PrsAppHome_02Page.all_radioInput).click() 
    await (await PrsAppHome_02Page.all_radioInput).click()
	await (await PrsAppHome_02Page.facultyRirc_select).selectByVisibleText('Please select')
	await (await PrsAppHome_02Page.facultyRirc_select).selectByVisibleText('Arts & Social Sciences')
    await (await PrsAppHome_02Page.searchbutton_button).click()
	await expect(await PrsAppHome_02Page.result_count_div).toHaveTextContaining('1 rows')
    await (await PrsAppHome_02Page.result_count_div).click()
  })
})
