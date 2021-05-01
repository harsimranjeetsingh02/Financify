const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')

require('dotenv').config();

//Creating the node.js/express server 
const app = express();
const port = process.env.PORT || 5000;

//Attach the cors and express.json() middleware because we are sending and receiving json
app.use(cors());
app.use(express.json());

//Use Database URI to connect to database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

//Once connection is open
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully")
});

//Use API endpoints that will perform CRUD 
const expenseRouter = require('./routes/expenses');
const usersRouter = require('./routes/users');

app.use('/expenses', expenseRouter);
app.use('/users', usersRouter);


//Server will start to listen (start) on port 5000
app.listen(port, () => {
    console.log(`Server is running on port: ${port }`)
});
