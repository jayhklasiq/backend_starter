const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const handleError = require('../routes/errorRoute');
const regValidate = require('../utilities/account-validation');



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
  handleError,
  accountController.registerAccount
)

module.exports = router;