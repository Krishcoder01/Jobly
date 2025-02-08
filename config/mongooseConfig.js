const mongoose = require('mongoose');

function connect() {
    mongoose.connect('mongodb://127.0.0.1:27017/internshipPortal', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Connected to MongoDB Successfully !');
        })
        .catch((err) => {
            console.log('Error connecting to MongoDB', err);
        });
}

module.exports = connect;