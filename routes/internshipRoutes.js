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
//     "user": "65d7a5b0f5a9c2e8f0a12d34",
//     "internship": "65d7a5b0f5a9c2e8f0a12d99",
//     "resume": "https://example.com/resumes/user_resume.pdf",
//     "answers": [
//       {
//         "questions": "Why do you want to join this internship?",
//         "answers": "I am passionate about this field and want to gain experience."
//       },
//       {
//         "questions": "Do you have any prior experience?",
//         "answers": "Yes, I worked on similar projects in my college."
//       }
//     ]
//   }

// {
//     "status": "Shortlisted"
//   }