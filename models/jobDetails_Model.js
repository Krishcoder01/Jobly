const mongoose = require('mongoose');

const jobDetails = new mongoose.Schema({
    skillsRequired :[{
        type : String,
        required : true
    }],
    jobType : {
        type : String,
        required : true,
        enum : ['In-office','Hybrid','remote']
    },
    jobMode:{
        type : String,
        required : true,
        enum : ['Full-time','Part-time','Internship']
    },
    openings : {
        type : Number,
        required : true
    },
    startDate : {
        type : String,
        required : true,
        enum : ['Immediately','Within a week','Within a month','After a month']
    },
    duration : {
        type : Number,
        required : true
    },
    responsibilities : {
        type : String,
        required : true
    }
});




module.exports = mongoose.model('Job Details', jobDetails);