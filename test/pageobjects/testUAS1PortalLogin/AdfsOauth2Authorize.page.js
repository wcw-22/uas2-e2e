'use strict';

const Page = require('../Page')

class AdfsOauth2AuthorizePage extends Page {
  get usernameinput_emailInput () { return $('#userNameInput') } 
  get passwordinput_passwordInput () { return $('#passwordInput') } 
  get submitbutton_span () { return $('#submitButton') } 

  open() {
    //return super.open('/adfs/oauth2/authorize') // update as needed
    return super.open('/adfs/oauth2/authorize?response_type=code&client_id=CE5867F4C03748138D78B9161A6FD6C2-190402&resource=sg_edu_nus_oauth2&redirect_uri=https%3A%2F%2Foamserv9%3A8181%2Fuas%2FLogin') // update as needed
  }
} // end of class AdfsOauth2AuthorizePage

module.exports = new AdfsOauth2AuthorizePage();

