const mongoose = require('mongoose');

const contactPersonSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    }
});




module.exports = mongoose.model('Contact Person', contactPersonSchema);