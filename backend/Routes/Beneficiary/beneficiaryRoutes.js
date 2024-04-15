const express = require("express");
const beneficiaryController = require("../../Controllers/Beneficiary/beneficiaryController");
const router = express.Router();

router.route("/api/beneficiary/add").post(beneficiaryController.addBeneficiary);
router.route("/api/beneficiary/getAll").get(beneficiaryController.getAllBeneficiaries);
router.route("/api/beneficiary/getById/:id").get(beneficiaryController.getBeneficiaryById);
router.route("/api/beneficiary/update/:id").patch(beneficiaryController.updateBeneficiaryById);
router.route("/api/beneficiary/delete/:id").delete(beneficiaryController.deleteBeneficiaryById);


module.exports = router;
