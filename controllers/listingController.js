const stipendAndPerkModel = require('../models/stipendAndPerks_Model');
const screeningQuestionModel = require('../models/screeningQuestions_Model');
const organizationModel = require('../models/organizaion_Model');
const jobListingModel = require('../models/jobListing_Model');
const applicationModel = require('../models/application_Model')
const jobDetailsModel = require('../models/jobDetails_Model');



async function addJobDetails(req , res){
    try {
        const { skillsRequired , jobType , jobMode , openings , startDate ,duration , responsibilities } = req.body ;
        
        const jobDetails = new jobDetailsModel({
            skillsRequired , jobType , jobMode , openings , startDate ,duration , responsibilities
        });
        await jobDetails.save();
        res.status(201).json({ success: true, data: jobDetails });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

async function addStipendAndPerks(req , res){
   try {
    const {stipendType , amount , frequency , perks} = req.body ;
    const stipendAndPerks = new stipendAndPerkModel({stipendType , amount , frequency , perks});
    await stipendAndPerks.save();
    res.status(201).json({ success: true, data: stipendAndPerks });

   } catch (error) {
    res.status(400).json({ success: false, message: error.message });
    
   }

}

async function addScreeningQuestions(req , res){
    
    try {
        const screeningQuestions = new screeningQuestionModel(req.body);
        await screeningQuestions.save();
        res.status(201).json({ success: true, data: screeningQuestions });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

// async function createJobListing(req , res){
//     try {
//         const {  profile, detailsId, stipendAndPerksId, screeningQuestionsId } = req.body;

//         // console.log(req.user.contactPersonId + "yehh");

//     const organization = await organizationModel.findOne({contactPerson : req.user.contactPersonId});

//     // console.log(organization + "yehh");

//     if(!organization) return res.status(404).json({message : "Organization not found"});

//     if(organization.suspended){
//         return res.status(403).json({ message: "Your account is suspended from posting new internShip." });
//     }

//     const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

//     const jobCount = await jobListingModel.countDocuments({
//         organization: organization._id ,
//         createdAt: { $gte: startOfMonth }
//     });

//     if (jobCount >= 3) {
//         return res.status(400).json({ message: "You can only post 3 job listings per month." });
//     }

//     const newJobListing = new jobListingModel({ organization : organization._id, profile, details:detailsId, stipendAndPerks: stipendAndPerksId,  screeningQuestions:screeningQuestionsId });
//     await newJobListing.save();

//     organization.listings += 1;
//     await organization.save();

//     return res.status(201).json({ message: "Job listing created successfully", job: newJobListing });
//     } catch (error) {
//         return res.status(500).json({ message: "Server error", error: error.message });
//     }

// }

async function createJobListing(req, res) {
    try {
        const { profile, detailsId, stipendAndPerksId, screeningQuestionsId } = req.body;

        // Find the organization linked to the contact person
        const organization = await organizationModel.findOne({ contactPerson: req.user.contactPersonId });

        if (!organization) {
            return res.status(404).json({ message: "Organization not found" });
        }

        if (organization.suspended) {
            return res.status(403).json({ message: "Your account is suspended from posting new internships." });
        }

        // Validate required fields
        if (!detailsId || !stipendAndPerksId) {
            return res.status(400).json({ message: "Both details and stipendAndPerks are required." });
        }

        // Check if referenced documents exist
        const detailsExists = await jobDetailsModel.findById(detailsId);
        // const stipendExists = await stip.findById(stipendAndPerksId);

        // if (!detailsExists || !stipendExists) {
        //     return res.status(400).json({ message: "Invalid detailsId or stipendAndPerksId." });
        // }

        // Check monthly job listing limit
        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const jobCount = await jobListingModel.countDocuments({
            organization: organization._id,
            createdAt: { $gte: startOfMonth }
        });

        if (jobCount >= 3) {
            return res.status(400).json({ message: "You can only post 3 job listings per month." });
        }

        // Create new job listing
        const newJobListing = new jobListingModel({
            organization: organization._id,
            profile,
            details: detailsId, // Fixed field name
            stipendAndPerks: stipendAndPerksId, // Fixed field name
            screeningQuestions: screeningQuestionsId
        });

        await newJobListing.save();

        // Update organization's listing count
        organization.listings += 1;
        await organization.save();

        return res.status(201).json({ message: "Job listing created successfully", job: newJobListing });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}



async function updateListing(req , res){
    try {
        const { jobId } = req.params;
        const updatedData = req.body;

        const job = await jobListingModel.findByIdAndUpdate(jobId, updatedData, { new: true });
        if (!job) {
            return res.status(404).json({ message: "Job listing not found" });
        }

        return res.status(200).json({ message: "Job listing updated", job });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

async function  getAllJobListings(req , res){
    try {
            

        // const jobs = await jobListingModel.find()

        const jobs = await jobListingModel.find().populate('organization details stipendAndPerks screeningQuestions');
        console.log(jobs)
        return res.status(200).json(jobs);
        
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}


async function deleteJobListing (req , res){
    try {
        const { jobId } = req.params;
        const job = await jobListingModel.findByIdAndDelete(jobId);

        if (!job) {
            return res.status(404).json({ message: "Job listing not found" });
        }

        
        const organization = await organizationModel.findById(job.organization);
        if (organization) {
            organization.listings -= 1;
            await organization.save();
        }

        // if (organization.listings > 10) { // If 10+ jobs posted
        //     const hiredCount = await applicationModel.countDocuments({ organization: organization._id, status: "Hired" });

        //     if (hiredCount < 3) { // Less than 3 hires
        //         organization.suspended = true;
        //         await organization.save();
        //     }
        // }

        return res.status(200).json({ message: "Job listing deleted successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Error is deleting ", error: error.message });
    }
}


module.exports= { createJobListing, updateListing, getAllJobListings, deleteJobListing , addJobDetails ,addScreeningQuestions ,addStipendAndPerks}