const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */

Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += `<li><a href="/" title="Home Page">Home</a></li>`
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      `<a href="/inv/type/` +
      row.classsification_id +
      `" title="See our Inventory of ` +
      row.classification_name +
      'veehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

module.exports = Util