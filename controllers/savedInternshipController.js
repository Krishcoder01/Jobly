
const applicationModel = require('../models/application_Model');
const organizationModel = require('../models/organizaion_Model');
const userModel = require('../models/user_Model');
const jobListingModel = require('../models/jobListing_Model');
const savedInternship_Model = require('../models/savedInternship_Model');


async function saveInternship(req, res) {

    try {
        
        const { internshipId } = req.body ;
        const userId = req.user.id;

        const existingSave = await savedInternship_Model.findOne({ user: userId, internship: internshipId });
        if (existingSave) {
            return res.status(400).json({ message: 'Internship already saved' });
        }

        const savedInternship = new savedInternship_Model({ user: userId, internship: internshipId });
        await savedInternship.save();

        res.status(201).json({ message: 'Internship saved successfully' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function unsaveInternship (req , res){
    try {
        const userId = req.user.id;
        const internshipId = req.params.id;

        const result = await savedInternship_Model.findOneAndDelete({ user: userId, internship: internshipId });
        if (!result) {
            return res.status(404).json({ message: 'Internship not found in saved list' });
        }

        res.status(200).json({ message: 'Internship removed from saved list' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



async function getSavedInternship (req , res){
    try {
        const userId = req.user.id;
        const savedInternships = await savedInternship_Model.find({ user: userId }).populate('internship');
        res.status(200).json(savedInternships);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports={getSavedInternship,saveInternship,unsaveInternship}