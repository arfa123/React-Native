const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')

var router = require('./services/routes');
var app = express();

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use('/', router);
app.use(function(req,res,err){
    res.send(err);
})

var PORT = process.env.PORT || 3000;

console.log('listening on ',PORT)
app.listen(PORT)