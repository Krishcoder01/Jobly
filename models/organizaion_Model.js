const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
    contactPerson: {
        ref : 'Contact Person',
        type: mongoose.Schema.Types.ObjectId
    },
    details: {
        ref: 'Organization Details',
        type: mongoose.Schema.Types.ObjectId
    },
    verification: {
        ref: 'Verification Details',
        type: mongoose.Schema.Types.ObjectId
    },
    listings : {
        type : Number,
        default : 0
    },
    suspended :{
        type : Boolean,
        default : false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Organization', organizationSchema);