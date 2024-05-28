const express = require("express");
const stockItemController = require("../../Controllers/Stock/stockItemController");
const router = express.Router();

router.route("/api/stock/stockItem/add").post(stockItemController.createStockItem);
router.route("/api/stock/stockItem/getAll").get(stockItemController.getAllStockItems);
// router.route("/api/stock/stockItem/getById/:id").get(stockItemController.getStockItemById);
// router.route("/api/stock/stockItem/update/:id").patch(stockItemController.updateStockItemById);
// router.route("/api/stock/stockItem/delete/:id").delete(stockItemController.deleteStockItemById);

module.exports = router;
