const Family = require('../../Models/Family/familyModel');

// add Family
const addFamily = async (req, res) => {

    const newFamily = new Family({
        FamilyID: req.body.FamilyID,
        headOfFamilyName: req.body.headOfFamilyName,
        FamilyCity: req.body.FamilyCity,
        FamilyStreet: req.body.FamilyStreet,
        FamilyBuilding: req.body.FamilyBuilding,
        FamilyFloor: req.body.FamilyFloor,
        FamilyHomePhoneNumber: req.body.FamilyHomePhoneNumber,
        FamilyNumberOfPeople: req.body.FamilyNumberOfPeople,
        HaveCar: req.body.HaveCar,
        Type: req.body.Type
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
};

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

// update Family by id
const updateFamilyById = async (req, res) => {
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
}

// delete Family by id
const deleteFamilyById = async (req, res) => {
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
};

module.exports = {
    addFamily,
    getAllFamilies,
    getFamilyById,
    updateFamilyById,
    deleteFamilyById
}