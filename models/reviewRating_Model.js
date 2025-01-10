const mongoose = require('mongoose');


const reviewRatingSchema = new mongoose.Schema({
    review : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        required : true,
        min : 1,
        max : 5
    },
    organization : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Organization',
        required : true
    },
    createdAt :{
        type : Date,
        default : Date.now
    }
});





module.exports = mongoose.model('ReviewRating', reviewRatingSchema);