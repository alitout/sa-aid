const express = require("express");
const distributionController = require("../../Controllers/Distribution/distributionController");
const router = express.Router();

router.route("/api/distribution/create").post(distributionController.createDistribution);
router.route("/api/distribution/getAll").get(distributionController.getAllDistributions);
router.route("/api/distribution/getById/:id").get(distributionController.getDistributionById);
router.route("/api/distribution/update/:id").patch(distributionController.updateDistributionById);
router.route("/api/distribution/delete/:id").delete(distributionController.deleteDistributionById);

module.exports = router;
