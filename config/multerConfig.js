
const multer = require('multer');

// Set storage (temporary memory storage)
const storage = multer.memoryStorage(); 

// Initialize multer
const upload = multer({ storage });

module.exports = upload;
