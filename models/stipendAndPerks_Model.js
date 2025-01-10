const mongoose = require('mongoose');

const stipendAndPerksSchema = new mongoose.Schema({
    stipendType:{
        type : String,
        enum : ['Fixed','Variable' ,'Unpaid'],
        amount : Number,
        frequency : {
            type : String,
            enum : ['Monthly','Yearly']
        },
        perks :{
            certificate :{
                type : Boolean,
                default : false
            },
            letterOfRecommendation : {
                type : Boolean,
                default : false
            },
            flexibleHours : {
                type : Boolean,
                default : false
            },
            jobOffer : {
                type : Boolean,
                default : false
            },
            freeSnacks : {
                type : Boolean,
                default : false
            },
            fiveDaysWorking : {
                type : Boolean,
                default : false
            }
        }
    }
});





module.exports = mongoose.model('Stipend And Perks', stipendAndPerksSchema);