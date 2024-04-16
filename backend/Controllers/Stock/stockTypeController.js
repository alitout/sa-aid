const StockType = require("../../Models/Stock/stockTypeModel");

// create stock type
const createStockType = async (req, res) => {
    const newStockType = new StockType({
        TypeName: req.body.TypeName,
    });
    try {
        const savedStockType = await newStockType.save();
        res.status(200).json({
            msg: "Stock Type Added Successfully",
            data: savedStockType,
        });
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

//  get all stock types
const getAllStockTypes = async (req, res) => {
    try {
        const stockTypes = await StockType.find();
        if (!stockTypes) {
            return res.status(404).send("No Stock Types found");
        }
        res.status(200).json(stockTypes);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

// get stock type by id
const getStockTypeById = async (req, res) => {
    try {
        const stockType = await StockType.findOne({ StockTypeID: req.params.id });
        if (!stockType) {
            return res.status(404).send("Stock Type not found");
        }
        res.status(200).json(stockType);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

// update stock type by id
const updateStockTypeById = async (req, res) => {
    try {
        const updatedStockType = await Stock
            .findOneAndUpdate(
                { StockTypeID: req.params.id },
                req.body,
                { new: true }
            );
        if (!updatedStockType) {
            return res.status(404).send("Stock Type not found");
        }
        res.status(200).json({
            msg: "Stock Type Updated Successfully",
            data: updatedStockType,
        });
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
}

// delete stock type by id
const deleteStockTypeById = async (req, res) => {
    try {
        const deletedStockType = await StockType.findOneAndDelete({ StockTypeID: req.params.id });
        if (!deletedStockType) {
            return res.status(404).send("Stock Type not found");
        }
        res.status(200).json({
            msg: "Stock Type Deleted Successfully",
            data: deletedStockType,
        });
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

module.exports = {
    createStockType,
    getAllStockTypes,
    getStockTypeById,
    updateStockTypeById,
    deleteStockTypeById
};