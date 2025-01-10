const mongoose = require('mongoose');

const verificationDetailsSchema = new mongoose.Schema({
    companyDocuments :[{
        type : String,
        required : true
    }],
    socialMediaLinks : [{
        type : String ,
    }],
    website : {
        type : String,
    },
    isVerified : {
        type : Boolean,
        default : false
    }
}); 




module.exports = mongoose.model('Verification Details', verificationDetailsSchema);