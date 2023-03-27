const express = require('express');
const mongoose = require('mongoose');
const dotEnv = require('dotenv');

const api = require('./routes/api')

const connectDB = require('./config/db');


// Load Config --> 
dotEnv.config({path: "./config/config.env"})
// 

// DataBase connection
connectDB();



const app = express();


// View Engine :
// End View Engine Config

// BodyParser
app.use(express.urlencoded({extended: false}));
app.use(express.json());


// Start routes
app.use('/api', api);
// End routes




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`))



//? next Time :
// TODO : edit update controller : put || patch
// TODO : check create controller && hash password -->  !DONE 
// TODO : return errors better --> !DONE