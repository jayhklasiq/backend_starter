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

if (currentUrl.endsWith("/update_account")) {
  // Function to check if new password and confirm password match
  function checkPasswordMatch() {
    var newPassword = document.getElementById("new_password").value;
    var confirmPassword = document.getElementById("confirm_password").value;
    var errorSpan = document.getElementById("password-mismatch-error");

    if (newPassword !== confirmPassword) {
      errorSpan.textContent = "Passwords do not match";
      return false;
    } else {
      errorSpan.textContent = "";
      return true;
    }
  }

}

document.addEventListener("DOMContentLoaded", function () {
  // Get the password input fields and toggle checkbox from the login, register, and update account forms
  var loginPasswordInput = document.querySelector(".login-form input[type='password']");
  var registerPasswordInput = document.querySelector(".register-form input[type='password']");
  var UpdatePasswordInputs = document.querySelectorAll(".pwd-update-form input[type='password']");
  var toggleCheckbox = document.querySelectorAll(".toggle-password-checkbox");

  // Check if the toggle checkbox and password inputs exist in the forms
  if (toggleCheckbox && (loginPasswordInput || registerPasswordInput || UpdatePasswordInputs.length > 0)) {
    // Add event listener to each toggle checkbox
    toggleCheckbox.forEach(function (checkbox) {
      checkbox.addEventListener("change", function () {
        // Toggle the password visibility for the corresponding password input field
        var passwordInputs;
        if (checkbox.closest('.login-form')) {
          passwordInputs = [loginPasswordInput];
        } else if (checkbox.closest('.register-form')) {
          passwordInputs = [registerPasswordInput];
        } else if (checkbox.closest('.pwd-update-form')) {
          passwordInputs = Array.from(UpdatePasswordInputs);
        }

        if (passwordInputs) {
          passwordInputs.forEach(function (input) {
            if (checkbox.checked) {
              input.type = "text";
            } else {
              input.type = "password";
            }
          });
        }
      });
    });
  }
});


