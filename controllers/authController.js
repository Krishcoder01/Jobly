const {OtpGenerator }= require('../utils/function');
const {sendOtp ,verifyOtp } = require('../services/msg91');


async function sendOtpController(req, res){
    try {
        const { mobile } = req.body;
        if (!mobile) return res.status(400).json({ error: 'Mobile number is required' });

        const otp = OtpGenerator();
        await sendOtp(otp, mobile);
        res.json({ success: true, message: 'OTP sent successfully', otp });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

async function verifyOtpController(req, res){
    try {
        const { mobile, otp } = req.body;
        if (!mobile || !otp) return res.status(400).json({ error: 'Mobile number and OTP are required' });
        const response = await verifyOtp(mobile, otp);
        res.json({ success: true, message: 'OTP verified successfully', response });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

module.exports = {sendOtpController , verifyOtpController};