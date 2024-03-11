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
  accountController.registerAccount, handleError
)


// Process the login attempt
router.post(
  "/login",
  regValidate.loginRules(),
  async (req, res, next) => {
    try {
      await regValidate.checkLoginData(req, res, next);
      // Send "login process" response
      res.status(200).send('login process');
    } catch (error) {
      next(error); // Forward any errors to the error handler
    }
  }
);



module.exports = router;