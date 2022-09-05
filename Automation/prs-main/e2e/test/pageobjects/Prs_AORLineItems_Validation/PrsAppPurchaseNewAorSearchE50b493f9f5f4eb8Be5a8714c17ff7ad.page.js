const Page = require('./page')

class PrsAppPurchaseNewAorSearchE50b493f9f5f4eb8Be5a8714c17ff7adPage extends Page {
  get chemicalName_textInput () { return $('#chemicalName') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/search/e50b493f-9f5f-4eb8-be5a-8714c17ff7ad') // update as needed
  }
} // end of class PrsAppPurchaseNewAorSearchE50b493f9f5f4eb8Be5a8714c17ff7adPage

module.exports = new PrsAppPurchaseNewAorSearchE50b493f9f5f4eb8Be5a8714c17ff7adPage();

