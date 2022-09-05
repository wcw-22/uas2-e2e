const Page = require('./page')

class PrsAppPurchaseNewAorSearchE50b493f9f5f4eb8Be5a8714c17ff7ad_01Page extends Page {
  get search_button () { return $('DIV > DIV.desktop-min-content-height > FORM.form-horizontal > #targetMainButton > DIV.button-group.text-right.col-md-12 > BUTTON[type="submit"]') } 

  open() {
    return super.open('/prs/app/purchase/new/aor/search/e50b493f-9f5f-4eb8-be5a-8714c17ff7ad') // update as needed
  }
} // end of class PrsAppPurchaseNewAorSearchE50b493f9f5f4eb8Be5a8714c17ff7ad_01Page

module.exports = new PrsAppPurchaseNewAorSearchE50b493f9f5f4eb8Be5a8714c17ff7ad_01Page();

