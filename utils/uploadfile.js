const { storage, ID } = require('../config/appwriteConfig');

async function uploadFile(fileBuffer, fileName, bucketId) {
    try {
        const response = await storage.createFile(
            bucketId,
            ID.unique(),
            fileBuffer,
            { filename: fileName }
        );
        return response;
    } catch (error) {
        console.error('File upload error:', error.message);
        throw error;
    }
}

module.exports = uploadFile;
