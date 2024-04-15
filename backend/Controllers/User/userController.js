const User = require("../../Models/User/userModel")

// add User
const addUser = async (req, res) => {

    const newUser = new User({
        UserID: req.body.UserID,
        UserFName: req.body.UserFName,
        UserLName: req.body.UserLName,
        UserEmail: req.body.UserEmail,
        UserPassword: req.body.UserPassword,
        UserPhoneNumber: req.body.UserPhoneNumber,
        UserDOB: req.body.UserDOB,
        UserNationality: req.body.UserNationality,
        UserSex: req.body.UserSex,
        UserAddress: req.body.UserAddress,
        UserRole: req.body.UserRole,
        UserOrganization: req.body.UserOrganization
    });
    try {
        // const savedUser = await newUser.save();
        const oldUser = await User.findOne({ UserID: req.body.UserID });
        if (oldUser) {
            return res.status(400).send("User already exists");
        }
        const savedUser = await newUser.save();
        res.status(200).json({
            msg: "User Added Successfully",
            data: savedUser,
        });
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

// get All Users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users) {
            return res.status(404).send("No Users found");
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

// get User by id
const getUserById = async (req, res) => {
    try {
        const user = await User.findOne({ UserID: req.params.id });
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

// update User by id
const updateUserById = async (req, res) => {
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
};

// delete User by id
const deleteUserById = async (req, res) => {
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
};

// User Login
const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ UserEmail: req.body.UserEmail, UserPassword: req.body.UserPassword });
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
}

// User Logout
const logoutUser = async (req, res) => {
    try {
        const user = await User.findOne({ UserEmail: req.body.UserEmail });
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
}

// get User by Organization
const getUserByOrganization = async (req, res) => {
    try {
        const users = await User.find({ UserOrganization: req.params.id });
        if (!users) {
            return res.status(404).send("No Users found");
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

// get User by Role
const getUserByRole = async (req, res) => {
    try {
        const users = await User.find({ UserRole: req.params.role });
        if (!users) {
            return res.status(404).send("No Users found");
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

// get by organization and role
const getUserByOrganizationAndRole = async (req, res) => {
    try {
        const users = await User.find({ UserOrganization: req.params.id, UserRole: req.params.role });
        if (!users) {
            return res.status(404).send("No Users found");
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

module.exports = {
    addUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    loginUser,
    logoutUser,
    getUserByOrganization,
    getUserByRole,
    getUserByOrganizationAndRole
};
