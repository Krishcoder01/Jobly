const mongoose = require('mongoose');


const savedInternshipSchema = new mongoose.Schema({
    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    internship :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Job Listing'
    },
    createdAt :{
        type : Date,
        default : Date.now
    }
});





module.exports = mongoose.model('SavedInternship', savedInternshipSchema);