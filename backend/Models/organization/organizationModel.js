const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({
    OrganizationID: {
        type: String,
        // required: true,
        unique: true
    },
    OrganizationAbbreviation: {
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
    },
    OrganizationEmail: {
        type: String,
        required: true
    },
    OrganizationPassword: {
        type: String,
        required: true
    },
});

organizationSchema.pre('save', async function (next) {
    if (!this.isModified('OrganizationID')) {
        const count = await this.constructor.find().countDocuments();
        this.OrganizationID = `org${count + 1}`;
    }
    next();
});

organizationSchema.pre('save', async function (next) {
    if (!this.isModified('OrganizationName')) {
        return next();
    }

    const words = this.OrganizationName.split(' ');
    let abbreviation = '';

    if (words.length > 1) {
        // Take the first letter from each word up to a maximum of 3 letters
        abbreviation = words.slice(0, 3).map(word => word.charAt(0)).join('');
    } else {
        // Take the first 3 letters from the word
        abbreviation = words[0].substring(0, 3);
    }

    abbreviation = abbreviation.toUpperCase();

    // Check if the abbreviation already exists
    const exists = await this.constructor.findOne({ OrganizationAbbreviation: abbreviation });

    if (exists) {
        let suffix = 1;

        // Find a unique abbreviation
        while (await this.constructor.findOne({ OrganizationAbbreviation: abbreviation + suffix })) {
            suffix++;
        }

        abbreviation += suffix;
    }

    this.OrganizationAbbreviation = abbreviation;

    next();
});



module.exports = mongoose.model('Organization', organizationSchema);