const express = require('express');
const router = express.Router();
const {loginUser , signupUser,verifyOtpController, logoutUser}=require('../controllers/userController');
const {isVerifiedCheck} = require('../middlewares/checks');
const {tokenExtractor} = require('../middlewares/tokenExtractor');

router.post('/signup',signupUser);
router.post('/verify-otp',verifyOtpController);
router.post('/login',loginUser);
router.get('/logout', tokenExtractor , isVerifiedCheck , logoutUser);

module.exports = router ;