const Family = require('../../Models/Family/familyModel');
const verifyToken = require("../../Functions/verifyToken");

// add Family
const addFamily = [verifyToken, async (req, res) => {
    // Check if the authenticated entity is a Beneficiaries Admin
    if (req.user.role !== 'Beneficiaries admin') {
        return res.status(403).send("Access Denied: Only a Beneficiaries Admin can access this");
    }

    const { headOfFamilyName, FamilyCity, FamilyStreet, FamilyBuilding, FamilyFloor, FamilyHomePhoneNumber, FamilyNumberOfPeople, HaveCar, Type } = req.body;

    const newFamily = new Family({
        headOfFamilyName: headOfFamilyName,
        FamilyCity: FamilyCity,
        FamilyStreet: FamilyStreet,
        FamilyBuilding: FamilyBuilding,
        FamilyFloor: FamilyFloor,
        FamilyHomePhoneNumber: FamilyHomePhoneNumber,
        FamilyNumberOfPeople: FamilyNumberOfPeople,
        HaveCar: HaveCar,
        Type: Type,
        FamilyOrganization: req.user.UserOrganization
    });
    try {
        const oldFamily = await Family.findOne({
            FamilyID:
                req.body.FamilyID
        });
        if (oldFamily) {
            return res.status(400).send("Family already exists");
        }
        const savedFamily = await newFamily.save();
        res.status(200).json({
            msg: "Family Added Successfully",
            data: savedFamily,
        });
    } catch (error) {
        res.status(400).json({ error: error });
    }
}];


// update Family by id
const updateFamilyById = [verifyToken, async (req, res) => {
    // Check if the authenticated entity is a Beneficiaries Admin
    if (req.user.role !== 'Beneficiaries admin') {
        return res.status(403).send("Access Denied: Only a Beneficiaries Admin can access this");
    }
    try {
        const updatedFamily
            = await Family.findOneAndUpdate(
                { FamilyID: req.params.id },
                req.body,
                { new: true }
            );
        if (!updatedFamily) {
            return res.status(404).send("Family not found");
        }
        res.status(200).json({
            msg: "Family Updated Successfully",
            data: updatedFamily,
        });
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
}];


// delete Family by id
const deleteFamilyById = [verifyToken, async (req, res) => {
    // Check if the authenticated entity is a Beneficiaries Admin
    if (req.user.role !== 'Beneficiaries admin') {
        return res.status(403).send("Access Denied: Only a Beneficiaries Admin can access this");
    }
    try {
        const deletedFamily = await Family.findOneAndDelete({ FamilyID: req.params.id });
        if (!deletedFamily) {
            return res.status(404).send("Family not found");
        }
        res.status(200).json({
            msg: "Family Deleted Successfully",
            data: deletedFamily,
        });
    } catch (error) {
        res.status(400).json({ error: error });
    }
}];


// get all families by organization
const getFamiliesByOrganization = [verifyToken, async (req, res) => {
    // Check if the authenticated entity is an organization or Beneficiaries Admin or Distributions Admin
    if (req.user.role !== 'Organization' && req.user.role !== 'Beneficiaries admin' && req.user.role !== 'Distributions admin') {
        return res.status(403).send("Access Denied: Only an organization or a Beneficiaries Admin or a Distributions admin can access this");
    }
    try {
        let familyOrgID = req.user.role === 'Organization' ? req.user.OrganizationID : req.user.UserOrganization;
        const families = await Family.find({ FamilyOrganization: familyOrgID });
        if (!families) {
            return res.status(404).send("No Families found");
        }
        res.status(200).json(families);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}];


// get All Families
const getAllFamilies = async (req, res) => {
    try {
        const families = await Family.find();
        if (!families) {
            return res.status(404).send("No Families found");
        }
        res.status(200).json(families);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

// get Family by id
const getFamilyById = async (req, res) => {
    try {
        const family = await Family.findOne({ FamilyID: req.params.id });
        if (!family) {
            return res.status(404).send("Family not found");
        }
        res.status(200).json(family);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};


module.exports = {
    addFamily,
    getAllFamilies,
    getFamilyById,
    updateFamilyById,
    deleteFamilyById,
    getFamiliesByOrganization
}