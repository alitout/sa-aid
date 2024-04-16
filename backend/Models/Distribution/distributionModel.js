const mongoose = require('mongoose');
const User = require('../User/userModel');
const Stock = require('../Stock/stockModel');
const Beneficiary = require('../Beneficiary/beneficiaryModel');

const DistributionSchema = new mongoose.Schema({
    DistributionDate: {
        type: Date,
        default: Date.now
    },
    HeadOfDistributionID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    DistributorIDs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    StockID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock',
        required: true
    },
    BeneficiaryIDs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Beneficiary',
        required: true
    }]
});

module.exports = mongoose.model('Distribution', DistributionSchema);
