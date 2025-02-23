const axios = require('axios');
const { authKey , baseURL ,otpTemplate ,senderId } = require('../config/msg91');
const dotenv = require('dotenv');
dotenv.config();


async function sendOtp(otp, mobile) {  
    const options = {
        method: 'POST',
        url: baseURL,
        headers: { 'Content-Type': 'application/json' },
        data: {
            otp: otp,
            otp_expiry: '5',
            template_id: otpTemplate,
            mobile: `91${mobile}`,
            authkey: authKey,
            realTimeResponse: '1'
        }
    };
    
    try {
        const { data } = await axios.request(options);
        return data;
    } catch (error) {
        console.error('Error Sending OTP:', error.response?.data || error.message);
        throw error;
    }
}

async function verifyOtp(mobile, otp) {
    const options = {
        method: 'GET',  // Changed from GET to POST
        url: `${baseURL}/verify`,
        headers: { authKey },
        params : {mobile : `91${mobile}`, otp }
    };

    try {
        const { data } = await axios.request(options);
        return data;
    } catch (error) {
        console.error('Error Verifying OTP:', error.response?.data || error.message);
        throw error;
    }
}

module.exports = {sendOtp , verifyOtp};