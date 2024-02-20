

// Function to get the error message
const getErrorMessage = () => {
  const server500 = `
  <div id="e-500">
  <h3 class="error-500">Crashed Page! Try another link.</h2>
  </div>`
  return server500;
};


const get404Message = () => {
  const server404 = `
  <div id="e-500">
  <h3 class="error-500">This page does not exist. Please return to the Home Page.</h2>
  </div>`
  return server404;
};



module.exports = {
  getErrorMessage, get404Message
};
