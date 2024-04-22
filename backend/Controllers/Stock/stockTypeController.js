const StockType = require("../../Models/Stock/stockTypeModel");
const verifyToken = require("../../Functions/verifyToken");

// create stock type
const createStockType = [verifyToken, async (req, res) => {
    // Check if the authenticated entity is a Distributions Admin
    if (req.user.role !== 'Distributions admin') {
        return res.status(403).send("Access Denied: Only Distributions Admin can access this");
    }
    const newStockType = new StockType({
        TypeName: req.body.TypeName,
    });
    try {
        const OldStockType = await StockType.findOne({ TypeName: req.body.TypeName });
        if (OldStockType) {
            return res.status(404).send("Stock Type already exists");
        }
        const savedStockType = await newStockType.save();
        res.status(200).json({
            msg: "Stock Type Added Successfully",
            data: savedStockType,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error });
    }
}];

//  get all stock types
const getAllStockTypes = [verifyToken, async (req, res) => {
    // Check if the authenticated entity is a Distributions Admin
    if (req.user.role !== 'Distributions admin') {
        return res.status(403).send("Access Denied: Only Distributions Admin can access this");
    }
    try {
        const stockTypes = await StockType.find();
        if (!stockTypes) {
            return res.status(404).send("No Stock Types found");
        }
        res.status(200).json(stockTypes);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}];

// // get stock type by id
// const getStockTypeById = async (req, res) => {
//     try {
//         const stockType = await StockType.findOne({ StockTypeID: req.params.id });
//         if (!stockType) {
//             return res.status(404).send("Stock Type not found");
//         }
//         res.status(200).json(stockType);
//     } catch (error) {
//         res.status(400).json({ error: error });
//     }
// };

// // update stock type by id
// const updateStockTypeById = async (req, res) => {
//     try {
//         const updatedStockType = await Stock
//             .findOneAndUpdate(
//                 { StockTypeID: req.params.id },
//                 req.body,
//                 { new: true }
//             );
//         if (!updatedStockType) {
//             return res.status(404).send("Stock Type not found");
//         }
//         res.status(200).json({
//             msg: "Stock Type Updated Successfully",
//             data: updatedStockType,
//         });
//     }
//     catch (error) {
//         res.status(400).json({ error: error });
//     }
// }

// // delete stock type by id
// const deleteStockTypeById = async (req, res) => {
//     try {
//         const deletedStockType = await StockType.findOneAndDelete({ StockTypeID: req.params.id });
//         if (!deletedStockType) {
//             return res.status(404).send("Stock Type not found");
//         }
//         res.status(200).json({
//             msg: "Stock Type Deleted Successfully",
//             data: deletedStockType,
//         });
//     } catch (error) {
//         res.status(400).json({ error: error });
//     }
// }

module.exports = {
    createStockType,
    getAllStockTypes,
    // getStockTypeById,
    // updateStockTypeById,
    // deleteStockTypeById
};