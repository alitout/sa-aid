const User = require("../../Models/User/userModel");
const Organization = require("../../Models/organization/organizationModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require("../../Functions/verifyToken");
const secretKey = process.env.JWT_SECRET_KEY;


// add User
const addUser = [verifyToken, async (req, res) => {
    // Check if the authenticated entity is an organization
    if (req.user.role !== 'Organization') {
        return res.status(403).send("Access Denied: Only an organization can create a new user");
    }

    // Create a new user
    const { UserFName, UserLName, UserEmail, UserPassword, UserPhoneNumber, UserDOB, UserNationality, UserSex, UserAddress, UserRole, isHeadOfDistribution } = req.body;
    const hashedPassword = await bcrypt.hash(UserPassword, 10);

    const newUser = new User({
        UserFName: UserFName,
        UserLName: UserLName,
        UserEmail: UserEmail,
        UserPassword: hashedPassword,
        UserPhoneNumber: UserPhoneNumber,
        UserDOB: UserDOB,
        UserNationality: UserNationality,
        UserSex: UserSex,
        UserAddress: UserAddress,
        UserRole: UserRole,
        isHeadOfDistribution: isHeadOfDistribution,
        UserOrganization: req.user.OrganizationID
    });
    try {
        const oldUser = await User.findOne({ UserID: newUser.UserID });
        if (oldUser) {
            return res.status(400).send("User already exists");
        }
        const savedUser = await newUser.save();
        res.status(200).json({
            msg: "User Added Successfully",
            data: savedUser,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}];


// Update User by id
const updateUserById = [verifyToken, async (req, res) => {
    // Check if the authenticated entity is an organization or the user themselves
    if (req.user.role !== 'Organization' && req.user.UserID !== req.params.id) {
        return res.status(403).send("Access Denied: Only an organization or the user themselves can update a user");
    }

    // If the authenticated entity is an organization, check if the user belongs to the authenticated organization
    if (req.user.role === 'Organization') {
        const user = await User.findOne({ UserID: req.params.id });
        if (user.UserOrganization !== req.user.OrganizationID) {
            return res.status(403).send("Access Denied: You can only update users that belong to your organization");
        }
    }

    try {
        const updatedUser = await User.findOneAndUpdate(
            { UserID: req.params.id },
            req.body,
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).send("User not found");
        }
        res.status(200).json({
            msg: "User Updated Successfully",
            data: updatedUser,
        });
    } catch (error) {
        res.status(400).json({ error: error });
    }
}];


// Delete User by id
const deleteUserById = [verifyToken, async (req, res) => {
    // Check if the authenticated entity is an organization
    if (req.user.role !== 'Organization') {
        return res.status(403).send("Access Denied: Only an organization can delete a new user");
    }

    // Check if the user belongs to the authenticated organization
    const user = await User.findOne({ UserID: req.params.id });
    if (user.UserOrganization !== req.user.OrganizationID) {
        return res.status(403).send("Access Denied: You can only delete users that belong to your organization");
    }

    try {
        const deletedUser = await User.findOneAndDelete({ UserID: req.params.id });
        if (!deletedUser) {
            return res.status(404).send("User not found");
        }
        res.status(200).json({
            msg: "User Deleted Successfully",
            data: deletedUser,
        });
    } catch (error) {
        res.status(400).json({ error: error });
    }
}];


// User Login
const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ UserEmail: req.body.UserEmail });
        if (!user) {
            return res.status(404).send("User not found");
        }
        const validPassword = await bcrypt.compare(req.body.UserPassword, user.UserPassword);
        if (!validPassword) {
            return res.status(400).send("Invalid Password");
        }

        // Create a JWT token
        const token = jwt.sign({ Userid: user.UserID, role: user.UserRole, UserOrganization: user.UserOrganization }, secretKey);

        res.status(200).json({
            msg: "User Logged in Successfully",
            data: user,
            role: user.UserRole,
            token: token,
        });
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
};


// Get All User by Organization
const getAllUsers = [verifyToken, async (req, res) => {
    // Check if the authenticated entity is an organization or a Distributions Admin
    if (req.user.role !== 'Organization' && req.user.role !== 'Distributions admin') {
        return res.status(403).send("Access Denied: Only an organization or a Distributions Admin can access this");
    }

    try {
        let userOrgID = req.user.role === 'Organization' ? req.user.OrganizationID : req.user.UserOrganization;
        const users = await User.find({ UserOrganization: userOrgID });
        if (!users) {
            return res.status(404).send("No Users found");
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}];


// Get User by organization and id
const getUserById = [verifyToken, async (req, res) => {
    // Check if the authenticated entity is an organization or a Distributions Admin
    if (req.user.role !== 'Organization' && req.user.role !== 'Distributions admin') {
        return res.status(403).send("Access Denied: Only an organization or a Distributions Admin can access this");
    }
    try {
        let userOrgID = req.user.role === 'Organization' ? req.user.OrganizationID : req.user.UserOrganization;
        const user = await User.findOne(
            {
                UserID: req.params.id,
                UserOrganization: userOrgID
            }
        );
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}];

// Get User by Organization and Role
const getUserByRole = [verifyToken, async (req, res) => {
    // Check if the authenticated entity is an organization or a Distributions Admin
    if (req.user.role !== 'Organization' && req.user.role !== 'Distributions admin') {
        return res.status(403).send("Access Denied: Only an organization or a Distributions Admin can access this");
    }

    try {
        let userOrgID = req.user.role === 'Organization' ? req.user.OrganizationID : req.user.UserOrganization;
        const users = await User.find(
            {
                UserOrganization: userOrgID,
                UserRole: req.params.role
            }
        );
        if (!users) {
            return res.status(404).send("No Users found");
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error });
    }
}];

module.exports = {
    addUser,
    updateUserById,
    deleteUserById,
    loginUser,
    getAllUsers,
    getUserById,
    getUserByRole,
};
