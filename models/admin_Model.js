const e = require('express');
const mongoose = require('mongoose');
const { create } = require('./organizaion_Model');


const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'admin',
        enum: ['admin', 'superAdmin']
    },
    name :{
        type : String,
        required : true
    },
    mobile : {
        type : String,
        required : true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});




module.exports = mongoose.model('Admin', adminSchema);