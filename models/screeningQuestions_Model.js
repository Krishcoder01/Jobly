const mongoose = require('mongoose');


const screeningQuestionsSchema = new mongoose.Schema({
    customQuestions : [{
        type: String
    }],
    isCustomQuestions : {
        type : Boolean,
        default : false
    },
    isDefaultQuestions : {
        type : Boolean,
        default : true
    },
    defaultQuestions : [{
        type : String
    }]
});





module.exports = mongoose.model('Screening Questions', screeningQuestionsSchema);