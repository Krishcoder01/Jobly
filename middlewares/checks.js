const userModel = require('../models/user_Model');


const isVerifiedCheck = async (req, res, next) => {
    try {
        let user = await userModel.findOne({ id: req.user._id });
        if (!user) {
            return res.status(500).json({ message: "something is wrong at logout" });
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


module.exports = { isVerifiedCheck };