const Family = require('../../Models/Family/familyModel');
const verifyToken = require("../../Functions/verifyToken");
const Beneficiary = require('../../Models/Beneficiary/beneficiaryModel');
const beneficiaryModel = require('../../Models/Beneficiary/beneficiaryModel');

// add Family
const addFamily = [verifyToken, async (req, res) => {
    // Check if the authenticated entity is a Beneficiaries Admin
    if (req.user.role !== 'Beneficiaries admin') {
        return res.status(403).send("Access Denied: Only a Beneficiaries Admin can access this");
    }

    const { FamilyCountry, FamilyCity, FamilyStreet, FamilyBuilding, FamilyFloor, FamilyFloorPart, FamilyHomePhoneNumber, HaveCar, Type } = req.body;
    const FamilyAddress = `${FamilyCountry}, ${FamilyCity}, ${FamilyStreet}, ${FamilyBuilding}, ${FamilyFloor}, ${FamilyFloorPart}`;

    const newFamily = new Family({
        FamilyCountry: FamilyCountry,
        FamilyCity: FamilyCity,
        FamilyStreet: FamilyStreet,
        FamilyBuilding: FamilyBuilding,
        FamilyFloor: FamilyFloor,
        FamilyFloorPart: FamilyFloorPart,
        FamilyAddress: FamilyAddress,
        FamilyHomePhoneNumber: FamilyHomePhoneNumber,
        HaveCar: HaveCar,
        Type: Type,
        FamilyOrganization: req.user.UserOrganization
    });
    try {
        const oldAddress = await Family.findOne({ FamilyAddress: FamilyAddress });
        if (oldAddress) {
            return res.status(400).send("Family Address already exists");
        }
        const oldPhone = await Family.findOne({ FamilyHomePhoneNumber: FamilyHomePhoneNumber });
        if (oldPhone) {
            return res.status(400).send("Family Phone already exists");
        }
        const oldFamily = oldAddress || oldPhone;
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


// update Family by organization and id
const updateFamilyById = [verifyToken, async (req, res) => {
    // Check if the authenticated entity is a Beneficiaries Admin
    if (req.user.role !== 'Beneficiaries admin') {
        return res.status(403).send("Access Denied: Only a Beneficiaries Admin can access this");
    }
    try {
        const updatedFamily = await Family.findOneAndUpdate(
            {
                FamilyID: req.params.id,
                FamilyOrganization: req.user.UserOrganization
            },
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


// delete Family by organization and id
const deleteFamilyById = [verifyToken, async (req, res) => {
    if (req.user.role !== 'Beneficiaries admin') {
        return res.status(403).send("Access Denied: Only a Beneficiaries Admin can access this");
    }
    try {
        const deletedFamily = await Family.findOneAndDelete({
            FamilyID: req.params.id,
            FamilyOrganization: req.user.UserOrganization
        });
        const toDeleteBeneficiaries = await Beneficiary.find({ FamilyID: req.params.id });

        if (deletedFamily) {
            if (toDeleteBeneficiaries.length === 0) {
                return res.status(200).json({
                    msg: "Family Deleted Successfully",
                    data: deletedFamily,
                });
            }
            const deleteBeneficiaries = await beneficiaryModel.deleteMany({
                FamilyID: req.params.id,
            });
            res.status(200).json({
                msg: "Family and Users Deleted Successfully",
                data: { ...deletedFamily, deletedUsers },
            });
        } else {
            return res.status(404).send("Family not found");
        }
    } catch (error) {
        res.status(400).json({ error: error });
    }
}];


// get all families by organization
const getAllFamilies = [verifyToken, async (req, res) => {
    // Check if the authenticated entity is an organization or Beneficiaries Admin or Distributions Admin
    if (req.user.role !== 'Organization' && req.user.role !== 'Beneficiaries admin' && req.user.role !== 'Distributions admin') {
        return res.status(403).send("Access Denied: Only Organization, Beneficiaries Admin and Distributions Admin can access this");
    }
    try {
        let familyOrgCode = req.user.role === 'Organization' ? req.user.OrganizationCode : req.user.UserOrganization;
        const families = await Family.find({ FamilyOrganization: familyOrgCode });
        if (!families) {
            return res.status(404).send("No Families found");
        }
        res.status(200).json(families);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}];


// get family by organization and id
const getFamilyById = [verifyToken, async (req, res) => {
    // Check if the authenticated entity is an organization or Beneficiaries Admin or Distributions Admin
    if (req.user.role !== 'Organization' && req.user.role !== 'Beneficiaries admin' && req.user.role !== 'Distributions admin') {
        return res.status(403).send("Access Denied: Only Organization, Beneficiaries Admin and Distributions Admin can access this");
    }
    try {
        let familyOrgCode = req.user.role === 'Organization' ? req.user.OrganizationCode : req.user.UserOrganization;
        const family = await Family.findOne(
            {
                FamilyID: req.params.id,
                FamilyOrganization: familyOrgCode
            }
        );
        if (!family) {
            return res.status(404).send("Family not found");
        }
        res.status(200).json(family);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}];


// get all familiies by organization and type
const getFamiliesByType = [verifyToken, async (req, res) => {
    // Check if the authenticated entity is an organization or Beneficiaries Admin or Distributions Admin
    if (req.user.role !== 'Organization' && req.user.role !== 'Beneficiaries admin' && req.user.role !== 'Distributions admin') {
        return res.status(403).send("Access Denied: Only an organization or a Beneficiaries Admin or a Distributions admin can access this");
    }
    try {
        let familyOrgCode = req.user.role === 'Organization' ? req.user.OrganizationCode : req.user.UserOrganization;
        const families = await Family.find(
            {
                FamilyOrganization: familyOrgCode,
                Type: req.params.type
            }
        );
        if (!families) {
            return res.status(404).send("No Families found");
        }
        res.status(200).json(families);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}];


module.exports = {
    addFamily,
    updateFamilyById,
    deleteFamilyById,
    getAllFamilies,
    getFamilyById,
    getFamiliesByType
}