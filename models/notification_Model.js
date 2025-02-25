const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true // Indexing for faster lookups
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
    },
    application: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
    },
    message: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false,
        index: true // Helps when filtering unread notifications
    },
    type: {
        type: String,
        enum: [
            'Internship-Application', 'Internship-Status', 'Internship-Review', 
            'Internship-Shortlist', 'Internship-Accepted', 'Internship-Rejected', 
            'Internship-Reviewed', 'Internship-Shortlisted', 'Job-Alert'
        ],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Notification', notificationSchema);
