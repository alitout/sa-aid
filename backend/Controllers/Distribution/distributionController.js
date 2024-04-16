const Distribution = require('../../Models/Distribution/distributionModel');
const Stock = require('../../Models/Stock/stockModel');

// create distribution
const createDistribution = async (req, res) => {
    const newDistribution = new Distribution({
        StockID: req.body.StockID,
        Quantity: req.body.Quantity,
    });
    try {
        const savedDistribution = await newDistribution.save();
        res.status(200).json({
            msg: "Distribution Added Successfully",
            data: savedDistribution,
        });
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

// get all distributions
const getAllDistributions = async (req, res) => {
    try {
        const distributions = await Distribution.find();
        res.status(200).json({
            msg: "All Distributions",
            data: distributions,
        });
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

// get distribution by id
const getDistributionById = async (req, res) => {
    try {
        const distribution = await Distribution.findById(req.params.id);
        res.status(200).json({
            msg: "Distribution",
            data: distribution,
        });
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

// update distribution by id
const updateDistributionById = async (req, res) => {
    try {
        const updatedDistribution = await Distribution.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json({
            msg: "Distribution Updated",
            data: updatedDistribution,
        });
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

// delete distribution by id
const deleteDistributionById = async (req, res) => {
    try {
        const distribution = await Distribution.findByIdAndDelete(req.params.id);
        res.status(200).json({
            msg: "Distribution Deleted",
            data: distribution,
        });
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

module.exports = {
    createDistribution,
    getAllDistributions,
    getDistributionById,
    updateDistributionById,
    deleteDistributionById,
};