const express = require("express");
const familyController = require("../../Controllers/Family/familyController");
const router = express.Router();

router.route("/api/family/add").post(familyController.addFamily);
router.route("/api/family/getAll").get(familyController.getAllFamilies);
router.route("/api/family/getById/:id").get(familyController.getFamilyById);
router.route("/api/family/update/:id").patch(familyController.updateFamilyById);
router.route("/api/family/delete/:id").delete(familyController.deleteFamilyById);


module.exports = router;
