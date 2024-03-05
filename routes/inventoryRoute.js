// Needed Resources 
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")


// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

router.get('/detail/:inventoryId', invController.viewInventoryItemDetail);

router.get('/', invController.viewVehicleManagement);

router.get('/add-classification', invController.viewAddClassificationName)

router.post("/add-classification", invController.addClassificationName);

module.exports = router;