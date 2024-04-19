const mongoose = require("mongoose");
const Family = require("../Family/familyModel");
const Counter = require("../Counter/counterModel");


const BeneficiarySchema = new mongoose.Schema({
    BeneficiaryID: { // رقم الهوية
        type: String,
        unique: true
    },
    FamilyID: {
        type: String,
        ref: 'Family',
        required: true
    },
    BeneficiaryOrganization: {
        type: String,
        // required: true
    },
    BeneficiaryFName: {
        type: String,
        required: true
    },
    BeneficiaryLName: {
        type: String,
        required: true
    },
    BeneficiaryFatherName: {
        type: String,
        required: true
    },
    BeneficiaryNationality: {
        type: String,
        required: true
    },
    BeneficiarySex: { // male - female
        type: String,
        enum: ['ذكر', 'أنثى'],
        required: true
    },
    isHeadOfFamily: {
        type: Boolean,
        required: true
    },
    BeneficiaryDOB: {
        type: Date,
        required: true
    },
    BeneficiarySocialState: { // متزوج - أعزب - أرملة - مطلقة
        type: String,
        enum: ['أعزب', 'عزباء', 'متزوج', 'متزوجة', 'أرمل', 'أرملة', 'مطلق', 'مطلقة'],
        required: true
    },
    BeneficiaryEducationLevel: { // أمي - ابتدائي - متوسط - ثانوي - جامعي
        type: String,
        enum: ['أمي', 'ابتدائي', 'متوسط', 'ثانوي', 'جامعي'],
        required: true
    },
    BeneficiaryMajor: {
        type: String,
        required: true
    },
    BeneficiaryPlaceOfWork: {
        type: String,
        required: true
    },
    BeneficiaryJob: {
        type: String,
        required: true
    },
    BeneficiarySalary: {
        type: Number,
        required: true
    },
    BeneficiaryPhone: {
        type: String,
        required: true
    },
    BeneficiaryMedications: {
        type: String,
        required: true
    },
    isBeneficiaryActive: {
        type: Boolean,
        required: true
    }
});

// Pre-save hook to generate BeneficiaryID
BeneficiarySchema.pre('save', async function (next) {
    if (!this.isNew) {
        return next();
    }

    try {
        // Find the family
        const family = await Family.findOne({ FamilyID: this.FamilyID });
        if (!family) {
            throw new Error('Family not found');
        }

        // Find and update the counter
        const counter = await Counter.findByIdAndUpdate(
            { _id: this.FamilyID },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );

        // Generate the BeneficiaryID
        this.BeneficiaryID = `${this.FamilyID}_${counter.seq.toString().padStart(3, '0')}`;

        // Update the family
        family.FamilyMembers += 1;
        family.FamilyMemberIDs.push(this.BeneficiaryID);
        if (this.isHeadOfFamily) {
            family.HeadOfFamilyID = this.BeneficiaryID;
        }

        await family.save();

        next();
    } catch (error) {
        return next(error);
    }
});



module.exports = mongoose.model('Beneficiary', BeneficiarySchema);