const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async function (req, res) {
  const nav = await utilities.getNav()
  const searchInput = req.params.q
  res.render("index", { title: "Home", nav, errors: null, searchInput })
  req.flash("notice", "")
}

module.exports = baseController