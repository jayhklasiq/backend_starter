const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async function (req, res) {
  const nav = await utilities.getNav()
  // const loggedIn = await utilities.checkLogin(req, res)
  res.render("index", { title: "Home", nav })
  req.flash("notice", "")
}

module.exports = baseController