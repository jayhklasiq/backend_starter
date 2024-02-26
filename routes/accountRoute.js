const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const handleError = require('../routes/errorRoute');


//Route to build the login page
router.get('/login', accountController.buildLogin, handleError);


//Route to build sign up/register page
router.get('/register', accountController.buildRegister, handleError);


router.post("/register", accountController.registerAccount, handleError);


module.exports = router;