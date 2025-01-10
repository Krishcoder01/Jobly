const mongoose = require('mongoose');

const organizationDetailsSchema = new mongoose.Schema({
    organizationName : {
        type : String,
        required : true
    },
    description:{
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    industry :{
        type : String,
        required : true
    },
    numberOfEmployees : {
        type : Number,
        required : true
    },
    logo : {
        type : String,
        required : true
    }
});





module.exports = mongoose.model('Organization Details', organizationDetailsSchema);