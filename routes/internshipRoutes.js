const express =  require('express');
const router = express.Router();
const {applyForInternship ,getUserApplications , getInternshipApplications , updateApplicationStatus} = require('../controllers/internshipController');
const {getSavedInternship ,saveInternship ,unsaveInternship} = require('../controllers/savedInternshipController');
const { isVerifiedCheck ,isVerifiedOrganizationCheck} = require('../middlewares/checks');
const {tokenExtractor } = require('../middlewares/tokenExtractor');


// Apply for an Internship
router.post('/apply', tokenExtractor , isVerifiedCheck,  applyForInternship);

// Get all applications of a user
router.get('/user/:userId', tokenExtractor , isVerifiedCheck,  getUserApplications);

// Get all applications for a specific internship
router.get('/internship/:internshipId', tokenExtractor , isVerifiedOrganizationCheck,  getInternshipApplications);

// Update application status
router.put('/update-status/:applicationId', tokenExtractor , isVerifiedCheck,  updateApplicationStatus);

router.post('/save', tokenExtractor , isVerifiedCheck,  saveInternship);

router.get('/saved', tokenExtractor , isVerifiedCheck,  getSavedInternship);

router.delete('/unsave/:id', tokenExtractor , isVerifiedCheck,  unsaveInternship);



module.exports = router ;





// {
//     "status": "Shortlisted"
//   }