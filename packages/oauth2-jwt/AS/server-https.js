var express = require('express');
var bodyParser = require('body-parser');
var oauthserver = require('oauth2-server');
var memorystore = require('./model.js');
// var memorystore = require('./pop-model.js');

var http = require('http');
var https = require('https');
var fs = require('fs');

//The Key and the Certificate used to start an HTTPS server
var hskey = fs.readFileSync('./../certificate/key.pem');
var hscert = fs.readFileSync('./../certificate/cert.pem')

var options = {
    key: hskey,
    cert: hscert
};


var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.oauth = oauthserver({
  model: memorystore,
  grants: ['client_credentials', 'refresh_token'],
  debug: true,
  accessTokenLifetime: memorystore.JWT_ACCESS_TOKEN_EXPIRY_SECONDS,   // expiry time in seconds, consistent with JWT setting in model.js
  refreshTokenLifetime: memorystore.JWT_REFRESH_TOKEN_EXPIRY_SECONDS   // expiry time in seconds, consistent with JWT setting in model.js
});

console.log('Server Starting');
app.all('/oauth/token', app.oauth.grant());

app.get('/', app.oauth.authorise(), function (req, res) {
  res.send('Secret area');
});

app.use(app.oauth.errorHandler());

// app.listen(3000);
// app.listen(8080);
var httpServer = http.createServer(app);
var httpsServer = https.createServer(options, app);

httpServer.listen(8080);
httpsServer.listen(8443);
