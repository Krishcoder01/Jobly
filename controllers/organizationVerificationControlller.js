const organizationDetailModel = require('../models/organizationDetails_Model');
const organizationModel = require('../models/organizaion_Model');
const verificationDetailModel = require('../models/verificationDetails_Model');
const{ sendOtp , verifyOtp } = require('../services/msg91');  
const { OtpGenerator } = require('../utils/function');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const contactPersonModel = require('../models/contactPerson_model');


const verifyOrganizationController = async (req, res) => {
    try {
        const organization = await organizationModel.findOne({contactPerson : req.params.id});

        if (!organization) return res.status(404).json({ message: "Organization not found" });

        await verificationDetailModel.findByIdAndUpdate(organization.verification, { isVerified: true });
        await organizationModel.findByIdAndUpdate(organization._id, { suspended: true });

        
        res.status(200).json({ message: "Organization verified successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { verifyOrganizationController };