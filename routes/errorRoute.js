const express = require('express');
const router = express.Router();
const errorController = require('../controllers/errorController');

// Define the route that generates intentional error
router.get('/trigger-error', (req, res, next) => {
  const errorMessage = errorController.getErrorMessage();
  next(new Error(errorMessage));
});

module.exports = router;