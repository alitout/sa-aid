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
app.use('/', routes);

// Organization Routes
const organizationRouter = require('./Routes/organization/organizationRoutes'); // import the organizationRoutes file
app.use('/', organizationRouter); // use the organizationRoutes file

// Beneficiary Routes
const beneficiaryRouter = require('./Routes/Beneficiary/beneficiaryRoutes'); // import the beneficiaryRoutes file
app.use('/', beneficiaryRouter); // use the beneficiaryRoutes file

// Family Routes
const familyRouter = require('./Routes/Family/familyRoutes'); // import the familyRoutes file
app.use('/', familyRouter); // use the familyRoutes file

// User Routes
const userRouter = require('./Routes/User/userRoutes'); // import the userRoutes file
app.use('/', userRouter); // use the userRoutes file

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})