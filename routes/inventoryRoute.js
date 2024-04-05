// Needed Resources 
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const invModel = require("../models/inventory-model")
const invValidate = require('../utilities/inventory-validation');
const Util = require('../utilities');



// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

router.get('/detail/:inventoryId', invController.viewInventoryItemDetail);

router.get("/", Util.checkLogin, invController.viewVehicleManagement);

router.get('/add-classification', invController.viewAddClassificationName)

router.post("/add-classification", invController.addClassificationName);

router.get('/add-inventory', invController.viewCarRegisterationPage);

router.post(
  "/add-inventory",
  invValidate.validateVehicleInfoRules(),
  async (req, res, next) => {
    await invValidate.checkInputedVehicleInfo(req, res, next)
  }, invController.registerCarDetails
);

router.get("/getInventory/:classification_id", invController.getInventoryJSON)

router.get("/edit-inventory/:inventoryId", async (req, res, next) => {
  const inventoryId = req.params.inventoryId;
  invController.editCarInventory(req, res, next, inventoryId);
});

router.post("/edit-inventory/:inventoryId", invValidate.validateVehicleInfoRules(),
  async (req, res, next) => {
    await invValidate.checkUpdatededVehicleInfo(req, res, next)
  }, invController.updateInventory);



// Route to handle search form submission
router.get("/searchpage", invController.searchResultPage);


module.exports = router;