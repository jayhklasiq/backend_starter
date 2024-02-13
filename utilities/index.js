const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */

Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
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

module.exports = Util









/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function (data) {
  let grid; // Initialize grid variable
  if (data.length > 0) { // Check if data array is not empty
    grid = '<ul id="inv-display">'; // Start building the unordered list
    data.forEach(vehicle => { // Iterate through each vehicle in the data array
      grid += '<li>'; // Start building list item
      // Add link to detail page with image and title attributes
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +
        '" title="View ' + vehicle.inv_make + ' ' + vehicle.inv_model +
        'details"><img src="' + vehicle.inv_thumbnail +
        '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model +
        ' on CSE Motors" /></a>';
      grid += '<div class="namePrice">'; // Start building container for name and price
      grid += '<hr />'; // Add horizontal line
      grid += '<h2>'; // Start building heading for vehicle name
      // Add link to detail page with vehicle make and model as text
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +
        '" title="View ' + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' +
        vehicle.inv_make + ' ' + vehicle.inv_model + '</a>';
      grid += '</h2>'; // End heading
      // Display vehicle price with formatting
      grid += '<span>$' + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>';
      grid += '</div>'; // End namePrice container
      grid += '</li>'; // End list item
    });
    grid += '</ul>'; // End unordered list
  } else {
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'; // If no data, display notice
  }
  return grid; // Return the constructed HTML grid
}
