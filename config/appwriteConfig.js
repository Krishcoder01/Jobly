const {ID , Storage , Client} =require('appwrite')
// const { InputFile } = require('node-appwrite/file');

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT) // Your API Endpoint
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID) // Your project ID
    .setKey(process.env.APPWRITE_API_KEY) // Your secret API key;

const storage = new Storage(client);

module.exports = {storage , ID };


// If running in a browser environment, you can use File directly
const browserFile = new File(['hello'], 'hello.txt');
await storage.createFile('[BUCKET_ID]', ID.unique(), browserFile);

// If running in Node.js, use InputFile
const nodeFile = InputFile.fromPath('/path/to/file.jpg', 'file.jpg');
await storage.createFile('[BUCKET_ID]', ID.unique(), nodeFile);
