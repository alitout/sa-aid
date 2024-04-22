const mongoose = require('mongoose');
const StockType = require('./stockTypeModel');

const StockItemSchema = new mongoose.Schema({
    StockType: {
        type: String,
        ref: 'StockType',
        required: true
    },
    ItemName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('StockItem', StockItemSchema);