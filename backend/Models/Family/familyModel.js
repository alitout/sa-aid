const mongoose = require("mongoose");
const Counter = require("../Counter/counterModel");

// Define the family schema
const familySchema = new mongoose.Schema({
    FamilyID: {
        type: String,
        unique: true
    },
    headOfFamilyID: {
        type: String,
        // required: true
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
    FamilyHomePhoneNumber: {
        type: String,
        required: true
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
        // required: true
    }
});

// Pre-save hook to generate FamilyID
familySchema.pre('save', async function (next) {
    if (!this.isModified('FamilyCity')) {
        return next();
    }

    try {
        const cityPrefix = this.FamilyCity.substring(0, 3).toUpperCase();
        const counter = await Counter.findByIdAndUpdate(
            { _id: cityPrefix },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        this.FamilyID = `${cityPrefix}${counter.seq.toString().padStart(3, '0')}`;
        next();
    } catch (error) {
        return next(error);
    }
});


const Family = mongoose.model('Family', familySchema);

module.exports = Family;
