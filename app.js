//Jobly Platform


// All Imports
const express = require('express');
const app = express();



// All Middlewares


// All Routes

app.get('/', (req, res) => {
  res.send('Hello World');
});

// All Error Handlers

// Server Listening
app.listen(3000, () => {
  console.log('Server is running on port 3000 🚀🚀');
});