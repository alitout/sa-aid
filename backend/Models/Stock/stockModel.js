const mongoose = require('mongoose');
const StockItem = require('./stockItemModel');

const StockSchema = new mongoose.Schema({
    StockItem: {
        type: String,
        ref: 'StockItem',
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    },
    ExpiryDate: {
        type: Date,
        required: true
    },
    StockOrganization: {
        type: String,
        // required: true
    }
});

module.exports = mongoose.model('Stock', StockSchema);