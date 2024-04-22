const Stock = require("../../Models/Stock/stockModel");
const verifyToken = require("../../Functions/verifyToken");

// create stock
const createStock = [verifyToken, async (req, res) => {
    // Check if the authenticated entity is a Distributions Admin
    if (req.user.role !== 'Distributions admin') {
        return res.status(403).send("Access Denied: Only Distributions Admin can access this");
    }

    const { StockItem, Quantity, ExpiryDate } = req.body;

    const newStock = new Stock({
        StockOrganization: req.user.UserOrganization,
        StockItem: StockItem,
        Quantity: Quantity,
        ExpiryDate: ExpiryDate
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
}];


// update stock by organization and  id
const updateStockById = [verifyToken, async (req, res) => {
    // Check if the authenticated entity is a Distributions Admin
    if (req.user.role !== 'Distributions admin') {
        return res.status(403).send("Access Denied: Only Distributions Admin can access this");
    }
    try {
        const updatedStock = await Stock.findOneAndUpdate(
            {
                StockID: req.params.id,
                StockOrganization: req.user.UserOrganization
            },
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
}];


// delete stock by organization and id
const deleteStockById = [verifyToken, async (req, res) => {
    // Check if the authenticated entity is a Distributions Admin
    if (req.user.role !== 'Distributions admin') {
        return res.status(403).send("Access Denied: Only Distributions Admin can access this");
    }
    try {
        const deletedStock = await Stock.findOneAndDelete(
            {
                StockID: req.params.id,
                StockOrganization: req.user.UserOrganization
            }
        );
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
}];

// get all stocks by organization
const getAllStocks = [verifyToken, async (req, res) => {
    // Check if the authenticated entity is an organization or Distributions Admin
    if (req.user.role !== 'Organization' && req.user.role !== 'Distributions admin') {
        return res.status(403).send("Access Denied: Only an Organization or Distributions Admin can access this");
    }
    try {
        const StockOrgCode = req.user.role === 'Organization' ? req.user.OrganizationCode : req.user.UserOrganization;
        const stocks = await Stock.find({ StockOrganization: StockOrgCode });
        if (!stocks) {
            return res.status(404).send("No Stocks found");
        }
        res.status(200).json(stocks);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}];

// get stock by organization and id
const getStockById = [verifyToken, async (req, res) => {
    // Check if the authenticated entity is an organization or Distributions Admin
    if (req.user.role !== 'Organization' && req.user.role !== 'Distributions admin') {
        return res.status(403).send("Access Denied: Only an Organization or Distributions Admin can access this");
    }
    try {
        const StockOrgCode = req.user.role === 'Organization' ? req.user.OrganizationCode : req.user.UserOrganization;
        const stock = await Stock.findOne(
            {
                StockID: req.params.id,
                StockOrganization: StockOrgCode
            }
        );
        if (!stock) {
            return res.status(404).send("Stock not found");
        }
        res.status(200).json(stock);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}];


module.exports = {
    createStock,
    getAllStocks,
    getStockById,
    updateStockById,
    deleteStockById
};