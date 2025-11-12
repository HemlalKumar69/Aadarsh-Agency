const express = require("express");
const router = express.Router();
const reportsCtrl = require("../Controller/reports.controller");

router.get("/inventory-customer", reportsCtrl.getInventorySummaryCustomer);
router.get("/inventory-vendor", reportsCtrl.getInventorySummaryVendor);

// router.get("/inventory-status", reportsCtrl.getInventoryStatus);
// router.get("/customer-activity", reportsCtrl.getCustomerActivity);
module.exports = router;
