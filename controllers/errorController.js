// errorController.js

// Function to get the error message
const getErrorMessage = () => {
  const server500 = `
  <div id="e-500">
  <h3 class="error-500">Crashed Page! Try another link.</h2>
  </div>`
  return server500;
};

module.exports = {
  getErrorMessage
};
