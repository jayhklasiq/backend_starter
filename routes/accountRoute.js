const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const handleError = require('../routes/errorRoute');
const regValidate = require('../utilities/account-validation');
const Util = require('../utilities');


//Route to build the login page
router.get('/login', accountController.buildLogin, handleError);


//Route to build sign up/register page
router.get('/register', accountController.buildRegister, handleError);


// Process the registration data
router.post(
  "/register",
  regValidate.registationRules(),
  async (req, res, next) => {
    await regValidate.checkRegData(req, res, next)
  },
  accountController.registerAccount, handleError
);


// Process the login attempt
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  accountController.accountLogin, handleError
);

//Deliver Account Management Page
router.get("/", Util.checkLogin, accountController.accountLoginSuccess, handleError)


// Deliver the account update view
router.get("/update_account", Util.checkLogin, accountController.updateAccountPage, handleError);

// Route to process the account update request
router.post('/update_account', Util.checkLogin,
  regValidate.updateAccountRules(),
  regValidate.checkUpdateAccountData,
  accountController.updateAccount);

// Route to process the password update request
router.post('/update_password', Util.checkLogin,
  regValidate.updatePasswordRules(),
  regValidate.checkUpdatePasswordData,
  accountController.updatePassword);


router.get("/logout", accountController.logout, handleError)

module.exports = router;