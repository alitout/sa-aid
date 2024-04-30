const Organization = require("../../Models/organization/organizationModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;
const verifyToken = require("../../Functions/verifyToken");

// Register Organization
const registerOrganization = async (req, res) => {

    const { OrganizationCode, OrganizationName, OrganizationAddress, OrganizationPhone, OrganizationEmail, OrganizationPassword } = req.body;
    const hashedPassword = await bcrypt.hash(OrganizationPassword, 10);

    const newOrganization = new Organization({
        OrganizationCode: OrganizationCode,
        OrganizationName: OrganizationName,
        OrganizationAddress: OrganizationAddress,
        OrganizationPhone: OrganizationPhone,
        OrganizationEmail: OrganizationEmail,
        OrganizationPassword: hashedPassword,
    });

    try {
        const oldCode = await Organization.findOne({ OrganizationCode: req.body.OrganizationCode });
        if (oldCode) {
            return res.status(400).send("رمز المؤسسة مستخدم سابقا ");
        }
        const oldName = await Organization.findOne({ OrganizationName: req.body.OrganizationName });
        if (oldName) {
            return res.status(400).send("اسم المؤسسة مستخدم سابقا");
        }
        const oldPhone = await Organization.findOne({ OrganizationPhone: req.body.OrganizationPhone });
        if (oldPhone) {
            return res.status(400).send("رقم الهاتف مستخدم سابقا");
        }
        const oldEmail = await Organization.findOne({ OrganizationEmail: req.body.OrganizationEmail });
        if (oldEmail) {
            return res.status(400).send("البريد الالكتروني مستخدم سابقا");
        }
        const oldOrganization = oldCode || oldName || oldPhone || oldEmail;
        if (oldOrganization) {
            return res.status(400).send("هذه المؤسسة موجودة مسبقا");
        }
        const savedOrganization = await newOrganization.save();
        res.status(200).json({
            msg: "تم اضافة المؤسسة بنجاح",
            data: {
                OrganizationID: savedOrganization.OrganizationID,
                OrganizationCode: savedOrganization.OrganizationCode,
                OrganizationName: savedOrganization.OrganizationName,
                OrganizationAddress: savedOrganization.OrganizationAddress,
                OrganizationPhone: savedOrganization.OrganizationPhone,
                OrganizationEmail: savedOrganization.OrganizationEmail,
            },
        });
    } catch (error) {
        res.status(400).json({ error: error });
    }
};


// Update Organization
const updateOrganizationById = [verifyToken, async (req, res) => {
    // Check if the authenticated entity is the same as the organization being updated
    if (req.user.OrganizationID !== req.params.id) {
        return res.status(403).send("Access Denied: You can only update your own organization");
    }

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
}];


// Delete Organization
const deleteOrganizationById = [verifyToken, async (req, res) => {
    // Check if the authenticated entity is the same as the organization being deleted
    if (req.user.OrganizationID !== req.params.id) {
        return res.status(403).send("Access Denied: You can only delete your own organization");
    }

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
}];


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
        const token = jwt.sign({ OrganizationID: organization.OrganizationID, OrganizationCode: organization.OrganizationCode, role: 'Organization' }, secretKey);

        res.status(200).json({
            msg: "تم تسجيل الدخول بنجاح",
            data: {
                OrganizationID: organization.OrganizationID,
                OrganizationCode: organization.OrganizationCode,
                OrganizationName: organization.OrganizationName,
                OrganizationAddress: organization.OrganizationAddress,
                OrganizationPhone: organization.OrganizationPhone,
                OrganizationEmail: organization.OrganizationEmail,
            },
            bearerToken: token,
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

// Get self Organization
const getSelfOrganization = [verifyToken, async (req, res) => {
    try {
        const organization = await Organization.findOne({ OrganizationID: req.user.OrganizationID });
        if (!organization) {
            return res.status(404).send("المؤسسة غير موجودة");
        }
        res.status(200).json(organization);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}];

module.exports = {
    registerOrganization,
    updateOrganizationById,
    deleteOrganizationById,
    loginOrganization,
    getAllOrganizations,
    getOrganizationById,
    getSelfOrganization
};
