const Distribution = require('../../Models/Distribution/distributionModel');
const verifyToken = require("../../Functions/verifyToken");
const Stock = require('../../Models/Stock/stockModel');
const User = require('../../Models/User/userModel');


// create distribution
const createDistribution = [verifyToken, async (req, res) => {
    // Check if the authenticated entity is a Distribution Admin
    if (req.user.role !== 'Distributions admin') {
        return res.status(403).send("Access Denied: Only a Distributions Admin can access this");
    }

    const { DistributionDate, HeadOfDistributionID, DistributorIDs, StockID, BeneficiaryIDs } = req.body;

    const newDistribution = new Distribution({
        DistributionOrganization: req.user.UserOrganization,
        DistributionDate: DistributionDate,
        HeadOfDistributionID: HeadOfDistributionID,
        DistributorIDs: DistributorIDs,
        StockID: StockID,
        BeneficiaryIDs: BeneficiaryIDs
    });
    try {
        const savedDistribution = await newDistribution.save();
        res.status(200).json({
            msg: "Distribution Created Successfully",
            data: savedDistribution,
        });
    } catch (error) {
        res.status(400).json({ error: error });
    }
}];


// update distribution by organization and id
const updateDistributionById = [verifyToken, async (req, res) => {
    // Check if the authenticated entity is a Distributions Admin
    if (req.user.role !== 'Distributions admin') {
        return res.status(403).send("Access Denied: Only a Distributions Admin can access this");
    }
    try {
        const updatedDistribution = await Distribution.findOneAndUpdate(
            {
                DistributionID: req.params.id,
                DistributionOrganization: req.user.UserOrganization
            },
            req.body,
            { new: true }
        );
        if (!updatedDistribution) {
            return res.status(404).send("Distribution not found");
        }
        res.status(200).json({
            msg: "Distribution Updated Successfully",
            data: updatedDistribution,
        });
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
}];


// delete distribution by organization and id
const deleteDistributionById = [verifyToken, async (req, res) => {
    // Check if the authenticated entity is a Distributions Admin
    if (req.user.role !== 'Distributions admin') {
        return res.status(403).send("Access Denied: Only a Distributions Admin can access this");
    }
    try {
        const deletedDistribution = await Distribution.findOneAndDelete(
            {
                DistributionID: req.params.id,
                DistributionOrganization: req.user.UserOrganization
            }
        );
        if (!deletedDistribution) {
            return res.status(404).send("Distribution not found");
        }
        res.status(200).json({
            msg: "Distribution Deleted Successfully",
            data: deletedDistribution,
        });
    } catch (error) {
        res.status(400).json({ error: error });
    }
}];


// get all distributions by organization
const getAllDistributions = [verifyToken, async (req, res) => {
    // Check if the authenticated entity is an organization or Distributions Admin
    if (req.user.role !== 'Organization' && req.user.role !== 'Distributions admin') {
        return res.status(403).send("Access Denied: Only an Organization or a Distributions Admin can access this");
    }
    try {
        const distributionOrgID = req.user.role === 'Organization' ? req.user.OrganizationID : req.user.UserOrganization;
        const distributions = await Distribution.find({ DistributionOrganization: distributionOrgID });
        if (!distributions) {
            return res.status(404).send("No Distributions found");
        }
        res.status(200).json(distributions);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}];

// get distribution by organization and id
const getDistributionById = [verifyToken, async (req, res) => {
    // Check if the authenticated entity is an organization or Distributions Admin
    if (req.user.role !== 'Organization' && req.user.role !== 'Distributions admin') {
        return res.status(403).send("Access Denied: Only an Organization or a Distributions Admin can access this");
    }
    try {
        const distributionOrgID = req.user.role === 'Organization' ? req.user.OrganizationID : req.user.UserOrganization;
        const distribution = await Distribution.findOne(
            {
                DistributionID: req.params.id,
                DistributionOrganization: distributionOrgID
            }
        );
        if (!distribution) {
            return res.status(404).send("Distribution not found");
        }
        res.status(200).json(distribution);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}];


// get distributions by organization and UserID
const getDistributionsByUserId = [verifyToken, async (req, res) => {
    // Check if the authenticated entity is an organization or Distributions Admin or the user themselves
    if (req.user.role !== 'Organization' && req.user.role !== 'Distributions admin' && (req.user.role !== 'not admin' || req.user.Userid !== req.params.id)) {
        return res.status(403).send("Access Denied: Only an Organization or a Distributions Admin or the user themselves can access this");
    }

    try {
        let distributionOrgID = req.user.role === 'Organization' ? req.user.OrganizationID : req.user.UserOrganization;
        const distributions = await Distribution.find(
            {
                DistributionOrganization: distributionOrgID,
                $or: [
                    { HeadOfDistributionID: req.params.id },
                    { DistributorIDs: req.params.id },
                ],
                
            }
        );
        if (!distributions) {
            return res.status(404).send("No Distributions found");
        }
        res.status(200).json(distributions);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}];

module.exports = {
    createDistribution,
    updateDistributionById,
    deleteDistributionById,
    getAllDistributions,
    getDistributionById,
    getDistributionsByUserId
};