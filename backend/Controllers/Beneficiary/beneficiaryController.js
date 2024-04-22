const Beneficiary = require("../../Models/Beneficiary/beneficiaryModel");
const verifyToken = require("../../Functions/verifyToken");
const Family = require("../../Models/Family/familyModel");

// add beneficiary
const addBeneficiary = [verifyToken, async (req, res) => {
    // Check if the authenticated entity is a Beneficiaries Admin
    if (req.user.role !== 'Beneficiaries admin') {
        return res.status(403).send("Access Denied: Only a Beneficiaries Admin can access this");
    }

    const { BeneficiaryID, FamilyID, BeneficiaryFName, BeneficiaryLName, BeneficiaryFatherName, BeneficiaryNationality, BeneficiaryGender, isHeadOfFamily, BeneficiaryDOB, BeneficiarySocialState, BeneficiaryEducationLevel, BeneficiaryMajor, BeneficiaryPlaceOfWork, BeneficiaryJob, BeneficiarySalary, BeneficiaryPhone, BeneficiaryMedications, isBeneficiaryActive } = req.body;

    // Find the family
    const family = await Family.findOne({ FamilyID: FamilyID });
    if (!family) {
        return res.status(404).send("Family not found");
    }

    // Check if the family is in the same organization as the authenticated user
    if (family.FamilyOrganization !== req.user.UserOrganization) {
        return res.status(403).send("Access Denied: You can only add beneficiaries to families in your own organization");
    }

    const newBeneficiary = new Beneficiary({
        BeneficiaryID: BeneficiaryID,
        FamilyID: FamilyID,
        BeneficiaryOrganization: req.user.UserOrganization,
        BeneficiaryFName: BeneficiaryFName,
        BeneficiaryLName: BeneficiaryLName,
        BeneficiaryFatherName: BeneficiaryFatherName,
        BeneficiaryNationality: BeneficiaryNationality,
        BeneficiaryGender: BeneficiaryGender,
        isHeadOfFamily: isHeadOfFamily,
        BeneficiaryDOB: BeneficiaryDOB,
        BeneficiarySocialState: BeneficiarySocialState,
        BeneficiaryEducationLevel: BeneficiaryEducationLevel,
        BeneficiaryMajor: BeneficiaryMajor,
        BeneficiaryPlaceOfWork: BeneficiaryPlaceOfWork,
        BeneficiaryJob: BeneficiaryJob,
        BeneficiarySalary: BeneficiarySalary,
        BeneficiaryPhone: BeneficiaryPhone,
        BeneficiaryMedications: BeneficiaryMedications,
        isBeneficiaryActive: isBeneficiaryActive
    });

    try {
        const oldBeneficiaryID = await Beneficiary.findOne({ BeneficiaryID: req.body.BeneficiaryID });
        if (oldBeneficiaryID) {
            return res.status(400).send("Beneficiary ID already exists");
        }
        const oldBeneficiaryPhone = await Beneficiary.findOne({ BeneficiaryPhone: req.body.BeneficiaryPhone });
        if (oldBeneficiaryPhone) {
            return res.status(400).send("Beneficiary Phone already exists");
        }
        const oldBeneficiary = oldBeneficiaryID || oldBeneficiaryPhone;
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
}];


// update beneficiary by organization and id
const updateBeneficiaryById = [verifyToken, async (req, res) => {
    // Check if the authenticated entity is a Beneficiaries Admin
    if (req.user.role !== 'Beneficiaries admin') {
        return res.status(403).send("Access Denied: Only a Beneficiaries Admin can access this");
    }

    try {
        const updatedBeneficiary = await Beneficiary.findOneAndUpdate(
            {
                BeneficiaryID: req.params.id,
                BeneficiaryOrganization: req.user.UserOrganization // Add this line
            },
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
}];


// delete beneficiary by organization and id
const deleteBeneficiaryById = [verifyToken, async (req, res) => {
    // Check if the authenticated entity is a Beneficiaries Admin
    if (req.user.role !== 'Beneficiaries admin') {
        return res.status(403).send("Access Denied: Only a Beneficiaries Admin can access this");
    }

    try {
        const deletedBeneficiary = await Beneficiary.findOneAndDelete(
            {
                BeneficiaryID: req.params.id,
                BeneficiaryOrganization: req.user.UserOrganization // Add this line
            }
        );
        if (!deletedBeneficiary) {
            return res.status(404).send("Beneficiary not found");
        }

        // Find the family
        const family = await Family.findOne({ FamilyID: deletedBeneficiary.FamilyID });
        if (!family) {
            return res.status(404).send("Family not found");
        }
        // Update the family
        family.FamilyMembers -= 1;
        const index = family.FamilyMemberIDs.indexOf(deletedBeneficiary.BeneficiaryID);
        if (index > -1) {
            family.FamilyMemberIDs.splice(index, 1);
        }
        if (deletedBeneficiary.isHeadOfFamily) {
            family.HeadOfFamilyName = null;
            family.HeadOfFamilyPhone = null;
        }

        // Save the updated family document
        await family.save();

        res.status(200).json({
            msg: "Beneficiary Deleted Successfully",
            data: deletedBeneficiary,
        });
    } catch (error) {
        res.status(400).json({ error: error });
    }
}];



// Get all beneficiaries by organization
const getAllBeneficiaries = [verifyToken, async (req, res) => {
    // Check if the authenticated entity is a Beneficiaries Admin
    if (req.user.role !== 'Beneficiaries admin' && req.user.role !== 'Organization' && req.user.role !== 'Distributions admin') {
        return res.status(403).send("Access Denied: Only Organization, Beneficiaries Admin and Distributions Admin can access this");
    }

    try {
        let BeneficiaryOrgCode = req.user.role === 'Organization' ? req.user.OrganizationCode : req.user.UserOrganization;
        const beneficiaries = await Beneficiary.find({ BeneficiaryOrganization: BeneficiaryOrgCode });
        if (!beneficiaries) {
            return res.status(404).send("No Beneficiaries found");
        }
        res.status(200).json(beneficiaries);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}];


// Get beneficiary by organization by id
const getBeneficiaryById = [verifyToken, async (req, res) => {
    // Check if the authenticated entity is a Beneficiaries Admin
    if (req.user.role !== 'Beneficiaries admin' && req.user.role !== 'Organization' && req.user.role !== 'Distributions admin') {
        return res.status(403).send("Access Denied: Only Organization, Beneficiaries Admin and Distributions Admin can access this");
    }

    try {
        let BeneficiaryOrgCode = req.user.role === 'Organization' ? req.user.OrganizationCode : req.user.UserOrganization;
        const beneficiary = await Beneficiary.findOne(
            {
                BeneficiaryID: req.params.id,
                BeneficiaryOrganization: BeneficiaryOrgCode // Add this line
            }
        );
        if (!beneficiary) {
            return res.status(404).send("Beneficiary not found");
        }
        res.status(200).json(beneficiary);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}];


module.exports = {
    addBeneficiary,
    updateBeneficiaryById,
    deleteBeneficiaryById,
    getAllBeneficiaries,
    getBeneficiaryById
};
