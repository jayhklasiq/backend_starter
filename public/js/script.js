let currentUrl = window.location.pathname;

if (currentUrl.endsWith("/register")) {
  function validateForm() {
    var password = document.getElementById("password").value;
    var passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    if (!passwordPattern.test(password)) {
      alert("Password must be at least 12 characters long, contain at least one capital letter, one number, and one special character.");
      return false;
    }
    return true;
  }
}


if (currentUrl.endsWith("/register") || currentUrl.endsWith("/login")) {
  document.addEventListener("DOMContentLoaded", function () {
    var toggleCheckbox = document.getElementById("toggle-password-checkbox");
    var passwordInput = document.getElementById("password");

    toggleCheckbox.addEventListener("change", function () {
      if (toggleCheckbox.checked) {
        passwordInput.type = "text";
      } else {
        passwordInput.type = "password";
      }
    });
  });
}

if (currentUrl.endsWith("/inv")) {
  'use strict'


  let classificationList = document.getElementById('classification')
  classificationList.addEventListener('change', function () {
    let classification_id = classificationList.value
    console.log(`classification_is is: ${classification_id}`)
    let classIdURL = "/inv/getInventory/" + classification_id
    fetch(classIdURL)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
        throw Error("Network response was not OK");
      })
      .then(function (data) {
        console.log(data);
        buildInventoryList(data);
      })
      .catch(function (error) {
        console.log('There was a problem: ', error.message)
      })
  })



  // Build inventory items into HTML table components and inject into DOM 
  function buildInventoryList(data) {
    let inventoryDisplay = document.getElementById("inventoryDisplay");
    // Set up the table labels 
    let dataTable = '<thead>';
    dataTable += '<tr><th>Vehicle Name</th><td>&nbsp;</td><td>&nbsp;</td></tr>';
    dataTable += '</thead>';
    // Set up the table body 
    dataTable += '<tbody>';
    // Iterate over all vehicles in the array and put each in a row 
    data.forEach(function (element) {
      console.log(element.inv_id + ", " + element.inv_model);
      dataTable += `<tr><td>${element.inv_make} ${element.inv_model}</td>`;
      dataTable += `<td><a href='/inv/edit-inventory/${element.inv_id}' title='Click to update'>Modify</a></td>`;
      dataTable += `<td><a href='/inv/delete/${element.inv_id}' title='Click to delete'>Delete</a></td></tr>`;
    })
    dataTable += '</tbody>';
    // Display the contents in the Inventory Management view 
    inventoryDisplay.innerHTML = dataTable;
  }
}

