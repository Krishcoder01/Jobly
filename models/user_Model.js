const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
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
    mobile: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    googleId: {
        type: String,
    },
    resumes: [{
        type: String,
    }],
    isVerified: {
        type: Boolean,
        default: false
    },
    appliedInternships: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    otp :{
        type : String,
    },
    otpExpires : {
        type : Date,
    }
});





module.exports = mongoose.model('User', userSchema);
