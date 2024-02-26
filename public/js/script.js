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