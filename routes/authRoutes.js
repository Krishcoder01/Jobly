const express = require('express');
const router = express.Router(); 
const { sendOtpController, verifyOtpController } = require('../controllers/authController');



router.post('/sendOtp', sendOtpController);
router.get('/verifyOtp', verifyOtpController);


module.exports = router;