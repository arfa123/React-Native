const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var router = require('./services/router');
var app = express();
mongoose.connect('mongodb://arfa:arfa123@ds135514.mlab.com:35514/patienttracker', {
    useMongoClient: true
});

app.use(morgan('combined'));
app.use(bodyParser.json())
app.use('/', router);
app.use(function(req,res,err){
    res.send(err);
})

var PORT = process.env.PORT || 3000;

console.log('listening on ',PORT)
app.listen(PORT)

// When successfully connected
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ');
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});