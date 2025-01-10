const e = require('express');
const { application } = require('express');
const mongoose = require('mongoose');


const notificationSchema = new mongoose.Schema({
    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    organization :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Organization',
        required : true
    },
    application :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Application',
        required : true
    },
    message :{
        type : String,
        required : true
    },
    isRead :{
        type : Boolean,
        default : false
    },
    type :{
        type : String,
        enum : ['Internship-Application','Internship-Status','Internship-Review','Internship-Shortlist','Internship-Accepted','Internship-Rejected','Internship-Reviewed','Internship-Shortlisted'],
    },
    createdAt :{
        type : Date,
        default : Date.now
    }
});




module.exports = mongoose.model('Notification', notificationSchema);
