const dotenv = require('dotenv');
dotenv.config();

baseURL= process.env.MSG91_BASE_URL,
authKey= process.env.MSG91_AUTH_KEY,
senderId= process.env.MSG91_SENDER_ID ,
// OTP Template
otpTemplate=process.env.MSG91_OTP_TEMPLATE,


module.exports ={ baseURL, authKey, senderId, otpTemplate
   
}