const mongoose = require('mongoose');
const StockType = require('./stockTypeModel');

const StockItemSchema = new mongoose.Schema({
    StockTypeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StockType',
        required: true
    },
    ItemName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('StockItem', StockItemSchema);