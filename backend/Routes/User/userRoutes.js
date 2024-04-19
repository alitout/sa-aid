const express = require("express");
const userController = require("../../Controllers/User/userController");
const router = express.Router();

router.route("/api/user/add").post(userController.addUser);
router.route("/api/user/update/:id").patch(userController.updateUserById);
router.route("/api/user/delete/:id").delete(userController.deleteUserById);
router.route("/api/user/login").post(userController.loginUser);
router.route("/api/user/getAll").get(userController.getAllUsers);
router.route("/api/user/getById/:id").get(userController.getUserById);
router.route("/api/user/getByRole/:role").get(userController.getUserByRole);


module.exports = router;
