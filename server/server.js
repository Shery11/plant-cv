


var express = require('express');
var bodyParser = require('body-parser');

var PORT = process.env.PORT | 3000;
var soil = require('./soil.js')
var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use('/sensor',soil);

app.listen(PORT);
console.log('Server running on port',PORT); 