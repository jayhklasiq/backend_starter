const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

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

invCont.addClassificationName = async function (req, res, next) {
  try {
    const { classification_name } = req.body;

    // Server-side validation
    if (!classification_name.match(/^[A-Za-z]+$/)) {
      req.flash("error", "Classification name must contain alphabetic characters only.");
      return res.redirect("./add-classification");
    }

    const registerNewClassification = await invModel.addClassificationName(classification_name)

    if (registerNewClassification) {
      req.flash(
        "notice",
        `Congratulations, you just added ${classification_name} as a classification. `
      );
      return res.redirect("./");
    } else {
      req.flash("notice", "Sorry, the registration failed.")
      return res.render("inventory/add-classification", {
        title: "Add Classification",
        nav: await utilities.getNav(),
      })
    }
  } catch (error) {
    next(error);
  }
}

module.exports = invCont