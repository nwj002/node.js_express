// main server point for the application. ( main file)

// importing the packages. (express.)
const express = require('express');
// const mongoose = require('mongoose'); // connecting the database with the server.
const connectDatabase = require('./database/database');
const dotenv = require('dotenv');

// creating an express application. 
const app = express();
app.use(express.json())

//dotenv configuration
dotenv.config()

//connecting to databas 
connectDatabase()

//defining the port 
const PORT = process.env.PORT;

//making a test endpoint. 
// EndPoints : POST, GET, PUT, DELETE
app.get('/test', (req, res) => {
    res.send('Hello World, test api is working.');
})

//https://localhost:5000/api/contact/create

//configuring routes
app.use('/api/contact', require('./routes/contactRoutes'))


// starting the server. 
app.listen(PORT, () => {
    console.log(`Server-app is running on port ${PORT}`);
});