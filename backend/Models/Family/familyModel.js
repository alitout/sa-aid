const mongoose = require("mongoose");
const Counter = require("../Counter/counterModel");
const Organization = require("../organization/organizationModel");

// Define the family schema
const familySchema = new mongoose.Schema({
    FamilyID: {
        type: String,
        unique: true
    },
    FamilyMembers: {
        type: Number,
        default: 0
    },
    FamilyMemberIDs: {
        type: [String],
        default: []
    },
    HeadOfFamilyID: {
        type: String,
        // required: true
    },
    HeadOfFamilyName: {
        type: String,
    },
    HeadOfFamilyPhone: {
        type: String,
        // unique: true
    },
    FamilyCountry: {
        type: String,
        required: true
    },
    FamilyCity: {
        type: String,
        required: true
    },
    FamilyStreet: {
        type: String,
        required: true
    },
    FamilyBuilding: {
        type: String,
        required: true
    },
    FamilyFloor: {
        type: String,
        required: true
    },
    FamilyFloorPart: {
        type: String,
        // required: true
    },
    FamilyAddress: {
        type: String,
        unique: true
    },
    FamilyHomePhoneNumber: {
        type: String,
    },
    HaveCar: {
        type: Boolean,
        required: true
    },
    Type: {
        type: String,
        required: true
    },
    FamilyOrganization: {
        type: String,
        ref: 'Organization',
        // required: true
    }
});

// Pre-save hook to generate FamilyID
familySchema.pre('save', async function (next) {
    if (!this.isModified('FamilyCity')) {
        return next();
    }

    try {
        const familyOrganization = this.FamilyOrganization;
        const cityPrefix = this.FamilyCity.toUpperCase();
        const counter = await Counter.findByIdAndUpdate(
            { _id: cityPrefix },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        this.FamilyID = `${familyOrganization}_${cityPrefix}${counter.seq.toString().padStart(4, '0')}`;
        next();
    } catch (error) {
        return next(error);
    }
});


const Family = mongoose.model('Family', familySchema);

module.exports = Family;
