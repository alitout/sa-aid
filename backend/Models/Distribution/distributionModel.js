const mongoose = require('mongoose');
const User = require('../User/userModel');
const Stock = require('../Stock/stockModel');
const Beneficiary = require('../Beneficiary/beneficiaryModel');
const Family = require('../Family/familyModel');
const Organization = require('../organization/organizationModel');
const Counter = require('../Counter/counterModel');

const DistributionSchema = new mongoose.Schema({
    DistributionID: {
        type: String,
        unique: true
    },
    DistributionOrganization: {
        type: String,
        // required: true
    },
    DistributionDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    HeadOfDistributionID: {
        type: String,
        ref: 'User',
        required: true
    },
    DistributorIDs: [{
        type: String,
        ref: 'User',
        required: true
    }],
    StockID: [{
        type: String,
        ref: 'Stock',
        required: true
    }],
    FamilyIDs: [{
        type: String,
        ref: 'Family',
        required: true
    }]
});

// Pre-save hook to generate DistributionID
DistributionSchema.pre('save', async function (next) {
    if (!this.isNew) {
        return next();
    }

    try {
        // Find the organization
        const organization = await Organization.findOne({ OrganizationID: this.DistributionOrganization });
        if (!organization) {
            throw new Error('Organization not found');
        }

        // Find and update the counter
        const counter = await Counter.findByIdAndUpdate(
            { _id: 'distribution' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );

        // Generate the DistributionID
        const year = this.DistributionDate.getFullYear();
        this.DistributionID = `${organization.OrganizationCode}${year}_D${counter.seq.toString().padStart(3, '0')}`;

        next();
    } catch (error) {
        return next(error);
    }
});


module.exports = mongoose.model('Distribution', DistributionSchema);
