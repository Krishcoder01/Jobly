const applicationModel = require('../models/application_Model');
const organizationModel = require('../models/organizaion_Model');
const userModel = require('../models/user_Model');
const jobListingModel = require('../models/jobListing_Model');

async function applyForInternship( req , res){
    try {
        const { internshipId, resume, answers } = req.body;
        const userId = req.user.id; // Assuming user is authenticated

        // Check if internship exists
        const internship = await jobListingModel.findById(internshipId);
        if (!internship) {
            return res.status(404).json({ message: 'Internship not found' });
        }

        // Create application
        const application = new applicationModel({
            user: userId,
            internship: internshipId,
            resume,
            answers
        });

        await application.save();

        // Add application to user's applied internships
        await userModel.findByIdAndUpdate(userId, { $push: { appliedInternships: application._id } });

        res.status(201).json({ message: 'Application submitted successfully', application });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}
async function getUserApplications( req , res){

    try {
        const userId = req.user.id;
        const applications = await applicationModel.find({ user: userId }).populate('internship');
        res.status(200).json({ applications });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}
async function getInternshipApplications( req , res){
    try {
        const { internshipId } = req.params;
        const applications = await applicationModel.find({ internship: internshipId }).populate('user');
        if (!applications.length) {
            return res.status(404).json({ message: 'No applications found for this job.' });
        }
        res.status(200).json({ applications });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}
async function updateApplicationStatus( req , res){

    try {
        const { applicationId } = req.params;
        const { status } = req.body;

        if (!['Pending', 'Accepted', 'Rejected', 'Reviewed', 'Shortlisted'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const application = await applicationModel.findByIdAndUpdate(applicationId, { status }, { new: true });
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.status(200).json({ message: 'Application status updated', application });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}





module.exports ={applyForInternship ,getUserApplications , getInternshipApplications , updateApplicationStatus} ;
