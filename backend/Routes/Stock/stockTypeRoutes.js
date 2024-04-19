const express = require("express");
const stockTypeController = require("../../Controllers/Stock/stockTypeController");
const router = express.Router();

router.route("/api/stock/stockType/add").post(stockTypeController.createStockType);
router.route("/api/stock/stockType/getAll").get(stockTypeController.getAllStockTypes);
// router.route("/api/stock/stockType/getById/:id").get(stockTypeController.getStockTypeById);
// router.route("/api/stock/stockType/update/:id").patch(stockTypeController.updateStockTypeById);
// router.route("/api/stock/stockType/delete/:id").delete(stockTypeController.deleteStockTypeById);

module.exports = router;
