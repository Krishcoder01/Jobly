const express =  require('express');
const router = express.Router();
const {addJobDetails ,addScreeningQuestions ,addStipendAndPerks ,createJobListing,deleteJobListing ,getAllJobListings ,updateListing} = require('../controllers/listingController');
const {isVerifiedCheck ,isVerifiedOrganizationCheck} = require('../middlewares/checks');
const {tokenExtractor} = require('../middlewares/tokenExtractor');



router.post('/job-details' , tokenExtractor ,isVerifiedOrganizationCheck ,addJobDetails);

router.post('/stipend-perks' , tokenExtractor ,isVerifiedOrganizationCheck ,  addStipendAndPerks);
router.post('/screening-question' , tokenExtractor , isVerifiedOrganizationCheck ,  addScreeningQuestions);

router.post( '/create-job-listing', tokenExtractor , isVerifiedOrganizationCheck ,  createJobListing);

router.patch('/job-listings/:id' ,tokenExtractor , isVerifiedOrganizationCheck ,  updateListing);

router.delete('/job-listings/:id' ,tokenExtractor , isVerifiedOrganizationCheck ,  deleteJobListing);

router.get('/job-listings' ,  getAllJobListings);


module.exports = router ;
