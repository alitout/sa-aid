const mongoose = require('mongoose');

// Define the counter schema
const counterSchema = new mongoose.Schema({
    _id: String,
    seq: { type: Number, default: 0 }
});

// Create and export the counter model
const Counter = mongoose.model('Counter', counterSchema);
module.exports = Counter;
