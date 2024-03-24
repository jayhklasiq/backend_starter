const utilities = require("../utilities/")
const accountModel = require("../models/account-model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()



/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/login", {
    title: "Login",
    nav,
    errors: null
  })
}

/* ****************************************
*  Deliver registration view
* *************************************** */
async function buildRegister(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/register", {
    title: "Register",
    nav,
    errors: null,
  })
}


/* ****************************************
*  Process Registration
* *************************************** */
async function registerAccount(req, res) {
  const { account_firstname, account_lastname, account_email, account_password } = req.body

  // Hash the password before storing
  let hashedPassword
  try {
    // regular password and cost (salt is generated automatically)
    hashedPassword = await bcrypt.hashSync(account_password, 10)
  } catch (error) {
    req.flash("notice", 'Sorry, there was an error processing the registration.')
    return res.status(500).redirect("/account/register")
  }

  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    hashedPassword
  )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${account_firstname}. Please log in.`
    )
    return res.status(201).redirect("/account/login")
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    return res.status(501).redirect("/account/register")
  }
}

/* ****************************************
 *  Process login request
 * ************************************ */
async function accountLogin(req, res) {
  const { account_email, account_password } = req.body
  const accountData = await accountModel.getAccountByEmail(account_email)
  if (!accountData) {
    req.flash("notice", "Please check your credentials and try again.")
    return res.status(400).redirect("/account/login")
  }
  try {
    if (await bcrypt.compare(account_password, accountData.account_password)) {
      delete accountData.account_password
      const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 * 1000 })
      res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 })
      return res.redirect("/account")
    }
    else {
      req.flash("notice", "Incorrect Password. Please try again.")
      return res.status(402).redirect("/account/login")
    }
  } catch (error) {
    return new Error('Access Forbidden')
  }
}

/* ****************************************
 *  Deliver login access page
 * ************************************ */
async function accountLoginSuccess(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/account_management", {
    title: "Login Successful",
    nav,
    errors: null
  })
}

/* ****************************************
 *  Deliver Update Account page
 * ************************************ */
async function updateAccountPage(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/update_account", {
    title: "Update Account",
    nav,
    errors: null
  })
}


/* ****************************************
 *  Process the account update request
 * ************************************ */
async function updateAccount(req, res, next) {
  try {
    const { account_firstname, account_lastname, account_email, account_id } = req.body;

    await accountModel.updateAccount(account_id, account_firstname, account_lastname, account_email);

    await accountModel.getAccountById(account_id);
    req.flash("notice", `${account_firstname}, your account was updated successfully.`);
    return res.redirect("account/account_management");
  } catch (error) {
    console.error("Error updating account information:", error);
    next(error);
  }
}



/* ****************************************
 *  Process the password update request
 * ************************************ */
async function updatePassword(req, res, next) {
  try {
    const { new_password, account_id } = req.body;

    const hashedPassword = await bcrypt.hash(new_password, 10);

    await accountModel.updatePassword(account_id, hashedPassword);
    req.flash("notice", `${account_firstname}, your password updated successfully.`);
    res.redirect("/account");
  } catch (error) {
    console.error("Error updating password:", error);
    next(error);
  }
}


/* ****************************************
 *  Handle logout
 * ************************************ */
async function logout(req, res) {
  res.clearCookie('jwt');
  res.redirect('/');
}


module.exports = { buildLogin, buildRegister, registerAccount, accountLogin, accountLoginSuccess, updateAccountPage, updateAccount, updatePassword, logout }