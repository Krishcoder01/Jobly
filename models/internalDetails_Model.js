const mongoose = require('mongoose');


const internalDetailsSchema = new mongoose.Schema({
    alternateMobile : {
        type : String,
        required : true
    }
});


module.exports = mongoose.model('Internal Details', internalDetailsSchema);
