const{ sendOtp , verifyOtp } = require('../services/msg91');  
const { OtpGenerator } = require('../utils/function');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const contactPersonModel = require('../models/contactPerson_model'); 
const organizationModel = require('../models/organizaion_Model');
const organizationDetails_Model = require('../models/organizationDetails_Model');
const verificationDetails_Model = require('../models/verificationDetails_Model');



const signupOrganization = async (req, res) => {
    try {
        const {firstName, lastName, email, phone, designation, password} = req.body;
        const existingUser = await contactPersonModel.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already exists" });

        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create Contact Person
        const contactPerson = await contactPersonModel.create({
            firstName,
            lastName,
            email,
            phone,
            designation,
            password: hashedPassword
        });

        // Send OTP
        let otp = OtpGenerator();
        await sendOtp(otp ,phone);

        res.status(201).json({ message: "OTP sent for verification", contactPersonId: contactPerson._id });

    } catch (error) {
         console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


const verifyOtpController = async (req, res) => {
    try {
        const { contactPersonId, otp } = req.body;
        const contactPerson = await contactPersonModel.findById({_id : contactPersonId});
        if (!contactPerson) return res.status(400).json({ message: "Invalid contact person" });

        const response = await verifyOtp(contactPerson.phone, otp);
        if (!response) return res.status(400).json({ message: "Invalid OTP" });

        const organization = new organizationModel({ contactPerson: contactPerson._id });
        await organization.save();

        const token = jwt.sign({ contactPersonId : contactPersonId  , email : contactPerson.email }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(200).json({ message: "Signup successful", organizationId: organization._id, token : token });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getOrganizationDetails = async (req, res) => {
    try {
        const { organizationName, description, city, industry, numberOfEmployees, logo } = req.body;

        console.log(organizationName, description, city, industry, numberOfEmployees, logo)

        // Create or Update Organization Details
        const organizationDetails = await organizationDetails_Model.create({
            organizationName,
            description,
            city,
            industry,
            numberOfEmployees,
            logo
        });

        console.log(organizationDetails);
        console.log(req.user.contactPersonId);

        // Link to Organization
        await organizationModel.findOneAndUpdate(
            { contactPerson: req.user.contactPersonId },
            { details: organizationDetails._id }
        );

        res.status(200).json({ message: "Organization details updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

const getOrganizationDocuments = async (req, res) => {
    try {
        const {companyDocuments, socialMediaLinks, website} = req.body;

        const organization = await organizationModel.findOne({ contactPerson : req.user.contactPersonId });

        if (!organization) return res.status(404).json({ message: "Organization not found" });

        const verification = await verificationDetails_Model.create({ companyDocuments, socialMediaLinks , website });
        await organizationModel.findOneAndUpdate({ contactPerson: req.user.contactPersonId }, { verification: verification._id });

        
        res.status(201).json({ organization });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const loginOrganization = async (req, res) => {
    try {
        const { email, password } = req.body;
        const contactPerson = await contactPersonModel.findOne({ email });

        if (!contactPerson) return res.status(400).json({ message: "Invalid credentials" });

        // Compare passwords
        const isMatch = await bcrypt.compare(password, contactPerson.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Generate JWT
        const token = jwt.sign({ contactPersonId: contactPerson._id  , email : email }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}




module.exports = { signupOrganization, verifyOtpController, loginOrganization , getOrganizationDetails , getOrganizationDocuments};