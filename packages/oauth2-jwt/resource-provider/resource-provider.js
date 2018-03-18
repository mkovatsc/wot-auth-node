const bearerToken = require('express-bearer-token');
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var https = require('https');
var fs = require('fs');
var jwt = require('jsonwebtoken');
var hscert = fs.readFileSync('./../certificate/cert1.pem')
var hskey = fs.readFileSync('./../certificate/key1.pem');

var JWT_SECRET_FOR_ACCESS_TOKEN = 'XT6PRpRuehFsyMa2';

var options = {
    key: hskey,
    cert: hscert
};


var app = express();



app.use(bearerToken());
app.use(function (req, res, next) {
  try{
    var decoded = jwt.verify(req.token, JWT_SECRET_FOR_ACCESS_TOKEN);
  } catch(err){
    return res.status(403).json({ error: 'No credentials sent!' });
  }
  next()
});

console.log('Server Starting');
app.get('/helloworld', function (req, res) {
  res.send('Hello World');
});

app.get('/temperature', function (req, res) {
  res.send('30 Degrees');
});



// app.listen(8001);
var httpsServer = https.createServer(options, app);

// httpServer.listen(8080);
httpsServer.listen(8444);
