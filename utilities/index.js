const invModel = require("../models/inventory-model")
const { body, validationResult } = require("express-validator")
const utilities = require(".")
const Util = {}
const jwt = require("jsonwebtoken")
require("dotenv").config()


/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul class=\"nav-list\">"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}


/* ************************
 * Build the dropdown menu on the add-inventory page
 ************************** */
Util.buildDropDownList = async function () {
  try {
    let data = await invModel.getClassifications();
    let select = "<select id=\"classification\" name=\"classification_id\" required>"
    select += "<option value=''>Select Classification</option>";
    data.rows.forEach((row) => {
      select += `<option value='${row.classification_id}'>${row.classification_name}</option>`;
    })
    select += "</select>"
    return select;
  } catch (error) {
    throw error;
  }
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function (data) {
  let grid
  if (data.length > 0) {
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => {
      grid += '<li>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id
        + '" title="View ' + vehicle.inv_make + ' ' + vehicle.inv_model
        + 'details"><img src="' + vehicle.inv_thumbnail
        + '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model
        + ' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id + '" title="View '
        + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">'
        + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$'
        + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else {
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* ***************************
 * Function to format vehicle information into HTML
 ************************** */
Util.buildVehicleInfo = async function (data) {
  let vehicleDataSection = `
  <div class="car-details">
  <img src="${data.inv_image}" alt="Image of ${data.inv_make} ${data.inv_model}">
    <section>
        <h2>${data.inv_make} ${data.inv_model} Details</h2>
        <ul>
        <li><strong>Price:</strong> $${new Intl.NumberFormat('en-US').format(data.inv_price)}</li>
            <li><strong>Description:</strong> ${data.inv_description}</li>
            <li><strong>Color:</strong> ${data.inv_color}</li>
            
            <li><strong>Mileage:</strong> ${new Intl.NumberFormat('en-US').format(data.inv_miles)} miles</li>
        </ul>
    </section>

  </div>
    
  `;
  return vehicleDataSection;
};

/* ****************************************
* Middleware to check token validity
**************************************** */
Util.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
    jwt.verify(
      req.cookies.jwt,
      process.env.ACCESS_TOKEN_SECRET,
      function (err, accountData) {
        if (err) {
          req.flash("Please log in")
          res.clearCookie("jwt")
          return res.redirect("/account/login")
        }
        res.locals.accountData = accountData
        res.locals.loggedin = 1
        next()
      })
  } else {
    next()
  }
}

/* ****************************************
 *  Check Login
 * ************************************ */
Util.checkLogin = (req, res, next) => {
  if (res.locals.loggedin) {
    next()
  } else {
    req.flash("notice", "Please log in.")
    return res.redirect("/account/login")
  }
}

module.exports = Util