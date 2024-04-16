const mongoose = require('mongoose');
const StockItem = require('./stockItemModel');

const StockSchema = new mongoose.Schema({
    StockItemID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StockItem',
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Stock', StockSchema);