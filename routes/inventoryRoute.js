// Needed Resources 
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const invValidate = require('../utilities/inventory-validation');



// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

router.get('/detail/:inventoryId', invController.viewInventoryItemDetail);

router.get('/', invController.viewVehicleManagement);

router.get('/add-classification', invController.viewAddClassificationName)

router.post("/add-classification", invController.addClassificationName);

router.get('/add-inventory', invController.viewCarRegisterationPage);

router.post(
  "/add-inventory",
  invValidate.validateVehicleInfoRules(),
  async (req, res, next) => {
    await invValidate.checkInputedVehicleInfo(req, res, next)
  }, invController.registerCarDetails
)


router.get("/getInventory/:classification_id", invController.getInventoryJSON)
module.exports = router; 0