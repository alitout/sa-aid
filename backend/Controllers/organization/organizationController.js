const Organization = require("../../Models/organization/organizationModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;
const verifyToken = require("../../Functions/verifyToken");

// Register Organization
const registerOrganization = async (req, res) => {

    const { OrganizationName, OrganizationAddress, OrganizationPhone, OrganizationEmail, OrganizationPassword } = req.body;
    const hashedPassword = await bcrypt.hash(OrganizationPassword, 10);

    const newOrganization = new Organization({
        OrganizationName: OrganizationName,
        OrganizationAddress: OrganizationAddress,
        OrganizationPhone: OrganizationPhone,
        OrganizationEmail: OrganizationEmail,
        OrganizationPassword: hashedPassword,
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
};

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

// Organization login
const loginOrganization = async (req, res) => {
    try {
        const organization = await Organization.findOne({ OrganizationEmail: req.body.OrganizationEmail });
        if (!organization) {
            return res.status(404).send("Organization not found");
        }
        const validPassword = await bcrypt.compare(req.body.OrganizationPassword, organization.OrganizationPassword);
        if (!validPassword) {
            return res.status(400).send("Invalid Password");
        }

        // Create a JWT token
        const token = jwt.sign({ OrganizationID: organization.OrganizationID, role: 'Organization' }, secretKey);

        res.status(200).json({
            msg: "Organization Logged In Successfully",
            data: organization,
            token: token,
        });
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

// Organization logout
const logoutOrganization = async (req, res) => {
    try {
        res.status(200).json({
            msg: "Organization Logged Out Successfully",
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
    deleteOrganizationById,
    loginOrganization,
    logoutOrganization
};
