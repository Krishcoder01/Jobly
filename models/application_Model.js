const mongoose = require('mongoose');


const applicationSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'

    },
    internship :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Job Listing'
    },
    resume : {
        type : String,
        required : true
    },
    status : {
        type : String,
        default : 'Pending',
        enum : ['Pending','Accepted','Rejected' , 'Reviewed' , 'Shortlisted']
    },
    answers:[{
        questions:{
            type : String
        } ,
        answers : {
            type : String
        }
    }]
});



module.exports = mongoose.model('Application', applicationSchema);