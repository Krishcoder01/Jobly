const userModel = require('../models/user_Model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {sendOtp ,verifyOtp}=require('../services/msg91');
const { OtpGenerator } = require('../utils/function');


//Signup Controller 
async function signupUser(req, res) {
    try{
        const {firstName , lastName ,email , mobile , password} = req.body;
        let user = await userModel.findOne({email});
        if(user){
            return res.status(400).json({message : "User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password , 12);
        const otp = OtpGenerator();
        let response = await sendOtp(otp , mobile);

        user = new userModel({
            firstName ,lastName , email , mobile , password : hashedPassword 
        });

        await user.save();
        res.status(200).json({message : "'OTP sent to your mobile. Verify to complete signup.'" , user});
    }catch(err){
        console.log(err);
    }
}

async function verifyOtpController(req, res){
    try {
        const { mobile, otp } = req.body;
        if (!mobile || !otp) return res.status(400).json({ error: 'Mobile number and OTP are required' });
        let response = await verifyOtp(mobile , otp);
        console.log(response);
        if(response.type === 'error'){
            return res.status(400).json({message : response.message});
        }
        let user  = await userModel.findOne({mobile});
        user.isVerified = true;
        await user.save();

        const token = jwt.sign({userId : user._id , mobile : user.mobile , email : user.email , verified : user.isVerified} , process.env.JWT_SECRET , {expiresIn : '12h'});

        res.status(200).json({ success: true, message: 'OTP verified successfully' , token : token});
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

async function loginUser(req , res){
    try {
        
        const {email , password} = req.body ;

        let user = await userModel.findOne({email});

        if(!user){
            return res.status(404).json({message :"User does not exist , kindly create a Account " })
        }
        
        const isMatch = bcrypt.compare(password ,user.password);

        if(!isMatch){
            return res.status(400).json({message : "Credentials are wrong"});
        }

        user.isVerified = true ;
        user.save();

        const token = await jwt.sign({userId : user._id , mobile : user.mobile , email : user.email , verified : user.isVerified} , process.env.JWT_SECRET , {expiresIn : '12h'});
         
        res.status(200).json({message : "Welcome back to Jobly !!" , token : token})

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function  logoutUser(req , res){
    try {
        let user = await userModel.findOne({_id :req.user.userId}); ;
        if(!user){
            return res.status(500).json({message : "something is wrong at logout"});
        }
        user.isVerified= false ;
        user.save();
        res.status(200).json({message : "Log Out sucessfully"})
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

async function googleAuth(){
    try {
        const { token } = req.body;
        const googleUser = await verifyGoogleToken(token);

        if (!googleUser) {
            return res.status(400).json({ message: 'Invalid Google token' });
        }

        let user = await userModel.findOne({ email: googleUser.email });

        if (!user) {
            user = new User({
                googleId: googleUser.googleId,
                email: googleUser.email,
                firstName: googleUser.firstName,
                lastName: googleUser.lastName,
                isVerified: googleUser.emailVerified,
            });

            await user.save();
        }
        let jwttoken = await jwt.sign({userId : user._id  , email : user.email , verified : user.isVerified} , process.env.JWT_SECRET , {expiresIn : '12h'});
        
        res.status(200).json({ message: 'Google Auth Successful', token: jwttoken });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports ={verifyOtpController ,signupUser , loginUser, logoutUser}