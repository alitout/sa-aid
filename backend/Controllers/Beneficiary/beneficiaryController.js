const Beneficiary = require("../../Models/Beneficiary/beneficiaryModel");

// add beneficiary
const addBeneficiary = async (req, res) => {

    const newBeneficiary = new Beneficiary({
        BeneficiaryID: req.body.BeneficiaryID,
        FamilyID: req.body.FamilyID,
        BeneficiaryFName: req.body.BeneficiaryFName,
        BeneficiaryLName: req.body.BeneficiaryLName,
        BeneficiaryFatherName: req.body.BeneficiaryFatherName,
        BeneficiaryNationality: req.body.BeneficiaryNationality,
        BeneficiarySex: req.body.BeneficiarySex,
        BeneficiaryDOB: req.body.BeneficiaryDOB,
        BeneficiarySocialState: req.body.BeneficiarySocialState,
        BeneficiaryEducationLevel: req.body.BeneficiaryEducationLevel,
        BeneficiaryMajor: req.body.BeneficiaryMajor,
        BeneficiaryPlaceOfWork: req.body.BeneficiaryPlaceOfWork,
        BeneficiaryJob: req.body.BeneficiaryJob,
        BeneficiarySalary: req.body.BeneficiarySalary,
        BeneficiaryPhone: req.body.BeneficiaryPhone,
        BeneficiaryMedications: req.body.BeneficiaryMedications,
        isBeneficiaryActive: req.body.isBeneficiaryActive
    });
    try {
        // const savedBeneficiary = await newBeneficiary.save();
        const oldBeneficiary = await Beneficiary.findOne({ BeneficiaryID: req.body.BeneficiaryID });
        if (oldBeneficiary) {
            return res.status(400).send("Beneficiary already exists");
        }
        const savedBeneficiary = await newBeneficiary.save();
        res.status(200).json({
            msg: "Beneficiary Added Successfully",
            data: savedBeneficiary,
        });
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

// get All beneficiaries
const getAllBeneficiaries = async (req, res) => {
    try {
        const beneficiaries = await Beneficiary.find();
        if (!beneficiaries) {
            return res.status(404).send("No Beneficiaries found");
        }
        res.status(200).json(beneficiaries);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

// get beneficiary by id
const getBeneficiaryById = async (req, res) => {
    try {
        const beneficiary = await Beneficiary.findOne({ BeneficiaryID: req.params.id });
        if (!beneficiary) {
            return res.status(404).send("Beneficiary not found");
        }
        res.status(200).json(beneficiary);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

// update beneficiary by id
const updateBeneficiaryById = async (req, res) => {
    try {
        const updatedBeneficiary = await Beneficiary.findOneAndUpdate(
            { BeneficiaryID: req.params.id },
            req.body,
            { new: true }
        );
        if (!updatedBeneficiary) {
            return res.status(404).send("Beneficiary not found");
        }
        res.status(200).json({
            msg: "Beneficiary Updated Successfully",
            data: updatedBeneficiary,
        });
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

// delete beneficiary by id
const deleteBeneficiaryById = async (req, res) => {
    try {
        const deletedBeneficiary = await Beneficiary.findOneAndDelete({ BeneficiaryID: req.params.id });
        if (!deletedBeneficiary) {
            return res.status(404).send("Beneficiary not found");
        }
        res.status(200).json({
            msg: "Beneficiary Deleted Successfully",
            data: deletedBeneficiary,
        });
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

module.exports = {
    addBeneficiary,
    getAllBeneficiaries,
    getBeneficiaryById,
    updateBeneficiaryById,
    deleteBeneficiaryById
};
