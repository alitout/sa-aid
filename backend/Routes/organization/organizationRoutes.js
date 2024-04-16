const express = require("express");
const organizationController = require("../../Controllers/organization/organizationController");
const router = express.Router();

router.route("/api/organization/register").post(organizationController.registerOrganization);
router.route("/api/organization/getAll").get(organizationController.getAllOrganizations);
router.route("/api/organization/getById/:id").get(organizationController.getOrganizationById);
router.route("/api/organization/update/:id").patch(organizationController.updateOrganizationById);
router.route("/api/organization/delete/:id").delete(organizationController.deleteOrganizationById);
router.route("/api/organization/login").post(organizationController.loginOrganization);
router.route("/api/organization/logout").post(organizationController.logoutOrganization);

module.exports = router;
