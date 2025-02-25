const userModel = require('../models/user_Model');
const contactPersonModel = require('../models/contactPerson_model');
const verificationDetailsModel = require('../models/verificationDetails_Model');
const organizationModel = require('../models/organizaion_Model');


const isVerifiedCheck = async (req, res, next) => {
    try {
        let user = await userModel.findOne({ id: req.user._id });
        if (!user) {
            return res.status(500).json({ message: "something is wrong at verified check time" });
        }
        if(user.isVerified){
            next();
        }
        else{
            return res.status(400).json({ message: "You are not verified"});
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const isVerifiedOrganizationCheck = async (req, res, next) => {
    try {
        let user = await organizationModel.findOne({ contactPerson : req.user.contactPersonId }).populate('verification');
        if (!user) {
            return res.status(500).json({ message: "something is wrong at verification middleware " });
        }
        if(user.verification.isVerified){
            next();
        }
        else{
            return res.status(400).json({ message: "You are not verified"});
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = { isVerifiedCheck , isVerifiedOrganizationCheck };