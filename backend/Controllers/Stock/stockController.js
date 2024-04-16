const Stock = require("../../Models/Stock/stockModel");

// create stock
const createStock = async (req, res) => {
    const newStock = new Stock({
        StockItemID: req.body.StockItemID,
        Quantity: req.body.Quantity,
    });
    try {
        const savedStock = await newStock.save();
        res.status(200).json({
            msg: "Stock Added Successfully",
            data: savedStock,
        });
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

// get all stocks
const getAllStocks = async (req, res) => {
    try {
        const stocks = await Stock.find();
        if (!stocks) {
            return res.status(404).send("No Stocks found");
        }
        res.status(200).json(stocks);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

// get stock by id
const getStockById = async (req, res) => {
    try {
        const stock = await Stock.findOne({ StockID: req.params.id });
        if (!stock) {
            return res.status(404).send("Stock not found");
        }
        res.status(200).json(stock);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

// update stock by id
const updateStockById = async (req, res) => {
    try {
        const updatedStock = await Stock.findOneAndUpdate(
            { StockID: req.params.id },
            req.body,
            { new: true }
        );
        if (!updatedStock) {
            return res.status(404).send("Stock not found");
        }
        res.status(200).json({
            msg: "Stock Updated Successfully",
            data: updatedStock,
        });
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

// delete stock by id
const deleteStockById = async (req, res) => {
    try {
        const deletedStock = await Stock.findOneAndDelete({ StockID: req.params.id });
        if (!deletedStock) {
            return res.status(404).send("Stock not found");
        }
        res.status(200).json({
            msg: "Stock Deleted Successfully",
            data: deletedStock,
        });
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

module.exports = {
    createStock,
    getAllStocks,
    getStockById,
    updateStockById,
    deleteStockById
};