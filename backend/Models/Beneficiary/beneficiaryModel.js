const mongoose = require("mongoose");
const Family = require("../Family/familyModel");


const BeneficiarySchema = new mongoose.Schema({
    BeneficiaryID: { // رقم الهوية
        type: String,
        required: true,
        unique: true
    },
    FamilyID: {
        type: String,
        ref: 'Family',
        required: true
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
        required: true
    },
    BeneficiaryDOB: {
        type: Date,
        required: true
    },
    BeneficiarySocialState: { // متزوج - أعزب - أرملة - مطلقة
        type: String,
        required: true
    },
    BeneficiaryEducationLevel: { // أمي - ابتدائي - متوسط - ثانوي - جامعي
        type: String,
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

// BeneficiarySchema.pre('save', async function (next) {
//     if (!this.isModified('OrganizationID')) {
//         const count = await this.constructor.find().countDocuments();
//         this.OrganizationID = `org${count + 1}`;
//     }
//     next();
// });

// possible to add in (pre) the auto family id

module.exports = mongoose.model('Beneficiary', BeneficiarySchema);