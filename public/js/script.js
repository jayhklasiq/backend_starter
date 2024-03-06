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



if (currentUrl.endsWith("/add-inventory")) {

  function validateForm() {
    // Get form inputs
    const make = document.getElementById("inv_make").value.trim();
    const model = document.getElementById("inv_model").value.trim();
    const year = document.getElementById("inv_year").value.trim();
    const description = document.getElementById("inv_description").value.trim();
    const image = document.getElementById("inv_image").value.trim();
    const thumbnail = document.getElementById("inv_thumbnail").value.trim();
    const price = document.getElementById("inv_price").value.trim();
    const color = document.getElementById("inv_color").value.trim();

    // Store all input fields in an array
    const inputs = [
      { value: make, name: "Make" },
      { value: model, name: "Model" },
      { value: year, name: "Year" },
      { value: description, name: "Description" },
      { value: image, name: "Image" },
      { value: thumbnail, name: "Thumbnail" },
      { value: price, name: "Price" },
      { value: color, name: "Color" }
    ];

    // Array to store invalid fields
    const invalidInputs = [];

    // Perform validation for each input
    inputs.forEach(input => {
      if (input.value === "") {
        invalidInputs.push(input.name);
      }
    });

    // Additional validation for specific fields (e.g., year, price)
    const currentYear = new Date().getFullYear();
    if (year === "" || isNaN(year) || parseInt(year) < 1900 || parseInt(year) > currentYear) {
      invalidInputs.push("Year");
    }

    if (isNaN(price) || parseFloat(price) <= 0) {
      invalidInputs.push("Price");
    }

    // If there are invalid inputs, display error messages
    if (invalidInputs.length > 0) {
      // Clear previous error messages
      const errorList = document.getElementsByClassName("notice");
      errorList.innerHTML = "";

      // Populate error messages
      invalidInputs.forEach(input => {
        const listItem = document.createElement("li");
        listItem.textContent = `${input} is required or invalid.`;
        errorList.appendChild(listItem);
      });

      // // Display error message container
      // const errorContainer = document.getElementById("error-container");
      // errorContainer.style.display = "block";

      // Prevent form submission
      return false;
    }

    // Validation passed
    return true;
  }

}