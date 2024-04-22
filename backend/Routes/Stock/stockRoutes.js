const express = require("express");
const stockController = require("../../Controllers/Stock/stockController");
const router = express.Router();

router.route("/api/stock/stock/create").post(stockController.createStock);
router.route("/api/stock/stock/update/:id").patch(stockController.updateStockById);
router.route("/api/stock/stock/delete/:id").delete(stockController.deleteStockById);
router.route("/api/stock/stock/getAll").get(stockController.getAllStocks);
router.route("/api/stock/stock/getById/:id").get(stockController.getStockById);

module.exports = router;
