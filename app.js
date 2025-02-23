//Jobly Platform


// All Imports
const express = require('express');
const app = express();
const connectDB = require('./config/mongooseConfig');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const organisationRoutes = require('./routes/organizationRoutes');




// All Configurations
connectDB();


// All Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();



// All Routes

app.get('/', (req, res) => {
  res.send('Welcome to Jobly Platform , I hope the journey will be amazing 🚀🚀');
});


//handels all authentication routes like SendOtp , verify otp , resend otp
app.use('/auth' , authRoutes);  
app.use('/api/user', userRoutes )
app.use('/api/organization/' , organisationRoutes)




// All Error Handlers

// Server Listening
app.listen(3000, () => {
  console.log('Server is running on port 3000 🚀🚀');
});