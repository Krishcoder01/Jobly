const express = require('express');
const router = express.Router();
const {loginOrganization ,signupOrganization ,verifyOtpController ,getOrganizationDetails ,getOrganizationDocuments } = require('../controllers/organizationController');
const {verifyOrganizationController} = require('../controllers/organizationVerificationControlller');


router.post('/signup',signupOrganization);
router.post('/verify-otp',verifyOtpController);
router.post('/login',loginOrganization);
router.post('/getOrganizationDetails',getOrganizationDetails);
router.post('/getOrganizationDocuments',getOrganizationDocuments);


router.post('/verify-organization/:id' ,verifyOrganizationController);




module.exports = router ;