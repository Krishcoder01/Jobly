const mongoose = require('mongoose');
const { create } = require('./organizaion_Model');

const jobListingSchema = new mongoose.Schema({

    organization: {
        ref: 'Organization',
        type: mongoose.Schema.Types.ObjectId
    },
    profile: {
        type: String,
        required: true
    },
    details :{
        ref : 'Job Details',
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    stipendAndPerks : {
        ref : 'Stipend And Perks',
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    screeningQuestions:{
        ref : 'Screening Questions',
        type : mongoose.Schema.Types.ObjectId,
    },
    internalDetails :{
        ref : 'Internal Details',
        type : mongoose.Schema.Types.ObjectId,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});




module.exports = mongoose.model('Job Listing', jobListingSchema);
