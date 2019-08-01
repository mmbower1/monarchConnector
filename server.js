const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const config = require("config");
const mongoose = require("mongoose");
const morgan = require('morgan');
const web3 = require('./web3.js');
const path = require('path');
const keys = require('./config/keys');
// const cronjob = require('./cronjob.js')

// Start cronjob 
// cronjob.startCronJob;

// app.use(express.static("static"));
// app.use(express.static(path.join(__dirname, 'build')));
app.use('/static', express.static(path.join(__dirname, 'client/build/static')))

// init middleware to allow access to req.body
app.use(express.json({ extended: false }));

// shows logs of user activity in terminal.
app.use(morgan("dev"));

// for remote
// const MONGODB_URI = "mongodb://admin:securePassword@localhost:27017/monarchdb?authSource=admin&w=1";
// for local
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/monarchdb";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
// mongoose.connect(
//     MONGODB_URI,
//     { useNewUrlParser: true },
//     { useCreateIndexes: true },
// );
mongoose.Promise = Promise;
console.log("Connecting to Mongo DB...");

mongoose.connect(MONGODB_URI, {useNewUrlParser: true}, function(err) {
    // console.log("MONGODB_URI: " + MONGODB_URI);
    if(err){
        console.log("There was an error connecting to mongo db: " + err);
    } else {
        console.log("Successfully connected to Mongo DB");
    }
});

// define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`The server has fired up on port ${PORT}`)
});