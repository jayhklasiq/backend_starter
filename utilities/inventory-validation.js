const utilities = require(".")
// const invModel = require("../models/inventory-model")
const { body, validationResult } = require("express-validator")
const validate = {}



/*  **********************************
 *  Add Vehicle Data Validation Rules
 * ********************************* */
validate.validateVehicleInfoRules = () => {
  return [
    body("inv_make")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Make cannot be left empty"),

    body("inv_model")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Model cannot be left empty"),

    body("inv_year")
      .trim()
      .isInt({ min: 1900, max: new Date().getFullYear() })
      .withMessage("Enter a valid year"),

    body("inv_description")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Description cannot be left empty"),

    body("inv_image")
      .trim()
      .isURL()
      .withMessage("Invalid image URL"),

    body("inv_thumbnail")
      .trim()
      .isURL()
      .withMessage("Invalid thumbnail URL"),

    body("inv_price")
      .trim()
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),

    body("inv_miles")
      .trim()
      .isInt({ min: 0 })
      .withMessage("Miles must be a non-negative integer"),

    body("inv_color")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Color cannot be left empty"),

    body("classification_id")
      .trim()
      .isInt({ min: 1 })
      .withMessage("Invalid classification ID"),
  ]
}

/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkInputedVehicleInfo = async (req, res, next) => {
  const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body;

  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    let select = await utilities.buildDropDownList()
    res.render("inventory/add-inventory", {
      errors,
      title: "Add Vehicle",
      nav,
      select,
      errors,
      inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id
    })
  }
  next()
}

module.exports = validate