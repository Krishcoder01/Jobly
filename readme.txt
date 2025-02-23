Hey , 
This is Krishna Jain :)

I am creating Jobly so that other doesnot faces the problem i find while
 looking for internship or a projects .


 const express = require('express');
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware');
const uploadFile = require('../utils/uploadFile');
const OrganizationDetails = require('../models/OrganizationDetails');

const router = express.Router();
const upload = multer(); // Middleware for handling multipart form data

router.post('/upload-logo', authMiddleware, upload.single('logo'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });

        const uploadedFile = await uploadFile(req.file.buffer, req.file.originalname, process.env.LOGO_BUCKET_ID);

        res.status(200).json({ message: "Logo uploaded successfully", fileId: uploadedFile.$id });
    } catch (error) {
        res.status(500).json({ message: "Error uploading logo" });
    }
});

module.exports = router;



router.post('/upload-documents', authMiddleware, upload.array('documents', 5), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) return res.status(400).json({ message: "No files uploaded" });

        let uploadedFiles = [];

        for (const file of req.files) {
            const uploadedFile = await uploadFile(file.buffer, file.originalname, process.env.DOCUMENTS_BUCKET_ID);
            uploadedFiles.push(uploadedFile.$id);
        }

        res.status(200).json({ message: "Documents uploaded successfully", fileIds: uploadedFiles });
    } catch (error) {
        res.status(500).json({ message: "Error uploading documents" });
    }
});


router.post('/upload-resume', authMiddleware, upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });

        const uploadedFile = await uploadFile(req.file.buffer, req.file.originalname, process.env.RESUME_BUCKET_ID);

        res.status(200).json({ message: "Resume uploaded successfully", fileId: uploadedFile.$id });
    } catch (error) {
        res.status(500).json({ message: "Error uploading resume" });
    }
});


const organizationDetailsRoutes = require('./routes/organizationDetails');
const organizationVerificationRoutes = require('./routes/organizationVerification');
const userRoutes = require('./routes/user');

app.use('/api/organization/details', organizationDetailsRoutes);
app.use('/api/organization/verify', organizationVerificationRoutes);
app.use('/api/user', userRoutes);
