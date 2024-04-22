const mongoose = require("mongoose");
const Organization = require("../organization/organizationModel");

const UserSchema = new mongoose.Schema({
    UserID: {
        type: String,
        unique: true
    },
    UserFName: {
        type: String,
        required: true
    },
    UserLName: {
        type: String,
        required: true
    },
    UserEmail: {
        type: String,
        required: true
    },
    UserPassword: {
        type: String,
        required: true
    },
    UserPhoneNumber: {
        type: String,
        required: true
    },
    UserDOB: {
        type: Date,
        required: true
    },
    UserNationality: {
        type: String,
        required: true
    },
    UserGender: {
        type: String,
        required: true
    },
    UserAddress: {
        type: String,
        required: true
    },
    UserRole: {
        type: String,
        enum: ['Distributions admin', 'Beneficiaries admin', 'not admin'],
        required: true
    },
    isHeadOfDistribution: {
        type: Boolean,
        // required: true
    },
    UserOrganization: {
        type: String,
        ref: 'Organization',
        // required: true
    }
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('UserOrganization')) {
        return next();
    }

    try {
        const organization = await Organization.findOne({ OrganizationCode: this.UserOrganization });
        const userCount = await this.constructor.countDocuments({ UserOrganization: this.UserOrganization });
        this.UserID = `${organization.OrganizationCode}${(userCount + 1).toString().padStart(3, '0')}`;
        next();
    } catch (error) {
        return next(error);
    }
});



module.exports = mongoose.model('User', UserSchema);