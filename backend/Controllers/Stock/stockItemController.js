const StockItem = require('../../Models/Stock/stockItemModel');

// create stock item
const createStockItem = async (req, res) => {
    const newStockItem = new StockItem({
        StockTypeID: req.body.StockTypeID,
        ItemName: req.body.ItemName,
    });
    try {
        const savedStockItem = await newStockItem.save();
        res.status(200).json({
            msg: "Stock Item Added Successfully",
            data: savedStockItem,
        });
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

// get all stock items
const getAllStockItems = async (req, res) => {
    try {
        const stockItems = await StockItem.find();
        if (!stockItems) {
            return res.status(404).send("No Stock Items found");
        }
        res.status(200).json(stockItems);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

// get stock item by id
const getStockItemById = async (req, res) => {
    try {
        const stockItem = await StockItem.findOne({ StockItemID: req.params.id });
        if (!stockItem) {
            return res.status(404).send("Stock Item not found");
        }
        res.status(200).json(stockItem);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

// update stock item by id
const updateStockItemById = async (req, res) => {
    try {
        const updatedStockItem = await StockItem.findOneAndUpdate(
            { StockItemID: req.params.id },
            req.body,
            { new: true }
        );
        if (!updatedStockItem) {
            return res.status(404).send("Stock Item not found");
        }
        res.status(200).json({
            msg: "Stock Item Updated Successfully",
            data: updatedStockItem,
        });
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
}

// delete stock item by id
const deleteStockItemById = async (req, res) => {
    try {
        const deletedStockItem = await StockItem.findOneAndDelete({ StockItemID: req.params.id });
        if (!deletedStockItem) {
            return res.status(404).send("Stock Item not found");
        }
        res.status(200).json({
            msg: "Stock Item Deleted Successfully",
            data: deletedStockItem,
        });
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

module.exports = {
    createStockItem,
    getAllStockItems,
    getStockItemById,
    updateStockItemById,
    deleteStockItemById,
};