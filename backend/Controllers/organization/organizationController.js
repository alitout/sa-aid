const Organization = require("../../Models/organization/organizationModel");

// Register Organization
const registerOrganization = async (req, res) => {

    const newOrganization = new Organization({
        OrganizationName: req.body.OrganizationName,
        OrganizationAddress: req.body.OrganizationAddress,
        OrganizationPhone: req.body.OrganizationPhone
    });

    try {
        const oldOrganization = await Organization.findOne({ OrganizationName: req.body.OrganizationName });
        if (oldOrganization) {
            return res.status(400).send("Organization already exists");
        }
        const savedOrganization = await newOrganization.save();
        res.status(200).json({
            msg: "Organization Added Successfully",
            data: savedOrganization,
        });
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

// Get All Organizations
const getAllOrganizations = async (req, res) => {
    try {
        const organizations = await Organization.find();
        if (!organizations) {
            return res.status(404).send("No Organizations found");
        }
        res.status(200).json(organizations);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}

// Get Organization By Id
const getOrganizationById = async (req, res) => {
    try {
        const organization = await Organization.findOne({ OrganizationID: req.params.id });
        if (!organization) {
            return res.status(404).send("Organization not found");
        }
        res.status(200).json(organization);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

// Update Organization
const updateOrganizationById = async (req, res) => {
    try {
        const updatedOrganization = await Organization.findOneAndUpdate(
            { OrganizationID: req.params.id },
            req.body,
            { new: true }
        );
        if (!updatedOrganization) {
            return res.status(404).send("Organization not found");
        }
        res.status(200).json({
            msg: "Organization Updated Successfully",
            data: updatedOrganization,
        });
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

// Delete Organization
const deleteOrganizationById = async (req, res) => {
    try {
        const deletedOrganization = await Organization.findOneAndDelete({ OrganizationID: req.params.id });
        if (!deletedOrganization) {
            return res.status(404).send("Organization not found");
        }
        res.status(200).json({
            msg: "Organization Deleted Successfully",
            data: deletedOrganization,
        });
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

module.exports = {
    registerOrganization,
    getAllOrganizations,
    getOrganizationById,
    updateOrganizationById,
    deleteOrganizationById
};
