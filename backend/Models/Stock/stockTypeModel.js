const mongoose = require('mongoose');

const StockTypeSchema = new mongoose.Schema({
    TypeName: {
        type: String,
        unique: true,
        required: true
    }
});

module.exports = mongoose.model('StockType', StockTypeSchema);