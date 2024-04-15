const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({
    OrganizationID: {
        type: String,
        // required: true,
        unique: true
    },
    OrganizationName: {
        type: String,
        required: true,
        unique: true
    },
    OrganizationAddress: {
        type: String,
        required: true
    },
    OrganizationPhone: {
        type: String,
        required: true
    }
});

organizationSchema.pre('save', async function (next) {
    if (!this.isModified('OrganizationID')) {
        const count = await this.constructor.find().countDocuments();
        this.OrganizationID = `org${count + 1}`;
    }
    next();
});

module.exports = mongoose.model('Organization', organizationSchema);