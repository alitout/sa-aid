require('dotenv').config(); // import the contents of .env file

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./Routes/routes'); // import the routes file
const mongoString = process.env.DATABASE_URL; // assign the value of DATABASE_URL to mongoString

mongoose.connect(mongoString); // connect the database to the server
const database = mongoose.connection; // assign the connection to the database

database.on('error', (error) => { // database.on means it will connect to the database, and throws any error if the connection fails.
    console.log(error)
})

database.once('connected', () => { // database.once means it will run only one time. If it is successful, it will show a message that says Database Connected.
    console.log('Database Connected');
})

const app = express();

app.use(express.json());
app.use('/api', routes);
app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})