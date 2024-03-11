const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")
const { validationResult } = require('express-validator');

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}



/* ***************************
 * View inventory item detail
 * ************************** */
invCont.viewInventoryItemDetail = async function (req, res, next) {
  try {
    const inventoryId = req.params.inventoryId;
    const vehicleData = await invModel.getVehicleDataById(inventoryId);
    const nav = await utilities.getNav();
    const pageContent = await utilities.buildVehicleInfo(vehicleData);
    res.render("inventory/item-detail", {
      title: `${vehicleData.inv_make} ${vehicleData.inv_model}`,
      nav,
      vehicleDataSection: pageContent,
    });
  } catch (error) {
    next(error);
  }
};


/* ***************************
 * View Vehicle Management Page
 * ************************** */
invCont.viewVehicleManagement = async function (req, res, next) {
  try {
    const nav = await utilities.getNav();
    res.render("inventory/management", {
      title: "Vehicle Management",
      nav,
      errors: null
    });
  } catch (error) {
    next(error);
  }
}


/* ***************************
 * View Add Classification Page
 * ************************** */
invCont.viewAddClassificationName = async function (req, res, next) {
  try {
    let nav = await utilities.getNav();
    res.render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: null
    });
  } catch (error) {
    next(error);
  }
};


/* ***************************
 * Process Add Classification Page Form
 * ************************** */
invCont.addClassificationName = async function (req, res, next) {
  try {
    const { classification_name } = req.body;

    // Server-side validation
    if (!classification_name.match(/^[A-Za-z]+$/)) {
      req.flash("notice", "Classification name must contain alphabetic characters only.");
      return res.status(500).render("inventory/add-classification", {
        title: "Add Classification",
        nav: await utilities.getNav(),
      });
    }

    const registerNewClassification = await invModel.addClassificationName(classification_name)

    if (registerNewClassification) {
      req.flash(
        "notice",
        `Congratulations, you just added ${classification_name} as a classification. `
      );
      res.status(201).redirect("./management");
    } else {
      req.flash("notice", "Sorry, the registration failed.")
      return res.status(501).render("inventory/add-classification", {
        title: "Add Classification",
        nav: await utilities.getNav(),
      })
    }
  } catch (error) {
    next(error);
  }
}


/* ***************************
 * View Add Vehicle Page
 * ************************** */
invCont.viewCarRegisterationPage = async function (req, res, next) {
  try {
    let nav = await utilities.getNav();
    let select = await utilities.buildDropDownList();
    res.render("inventory/add-inventory", {
      title: "Add Vehicle",
      nav,
      select,
      errors: null
    });
  } catch (error) {
    next(error);
  }
}

/* ***************************
 * Process Add Vehicle Page Form
 * ************************** */
invCont.registerCarDetails = async function (req, res) {
  let nav = await utilities.getNav();
  let select = await utilities.buildDropDownList();

  const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body;

  const updateInventoryTable = await invModel.addCarDetailsToInventory(inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id)


  if (updateInventoryTable) {
    req.flash(
      "notice",
      `Congratulations, you just added a ${inv_make} vehicle. `
    )
    res.status(301).render("inventory/management", {
      title: "Vehicle Management",
      nav,
      errors: null
    })
  } else {
    req.flash("notice", "Vehicle registration failed.");
    return res.status(500).render("inventory/add-inventory", {
      title: "Add Vehicle",
      nav,
      select,
      errors: null
    });
  }
}

module.exports = invCont