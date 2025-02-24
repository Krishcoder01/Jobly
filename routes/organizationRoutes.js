const express = require('express');
const router = express.Router();
const {tokenExtractor} = require('../middlewares/tokenExtractor')
const {loginOrganization ,signupOrganization ,verifyOtpController ,getOrganizationDetails ,getOrganizationDocuments } = require('../controllers/organizationController');
const {verifyOrganizationController} = require('../controllers/organizationVerificationControlller');


router.post('/signup',signupOrganization);
router.post('/verify-otp',verifyOtpController);
router.post('/login',loginOrganization);
router.post('/uploadOrganizationDetails', tokenExtractor,getOrganizationDetails);
router.post('/uploadOrganizationDocuments',tokenExtractor , getOrganizationDocuments);


router.post('/verify-organization/:id' ,verifyOrganizationController);




module.exports = router ;