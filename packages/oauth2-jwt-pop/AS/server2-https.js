var express = require('express');
var bodyParser = require('body-parser');
var oauthserver = require('oauth2-server');
var memorystore = require('./pop-model.js');
const x509 = require('x509');
var http = require('http');
var https = require('https');
var fs = require('fs');

var hskey = fs.readFileSync('./../certificate/key.pem');
var hscert = fs.readFileSync('./../certificate/cert.pem');
var cacert = fs.readFileSync('./../certificate/cert.pem');


var options = {
    key: hskey,
    cert: hscert,
    requestCert: true,
    rejectUnauthorized: false,
    ca: cacert
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

app.use(function (req, res, next) {
  const cert = req.connection.getPeerCertificate();
  if (req.client.authorized) {
  	  next()
  } else if (cert.subject) {
		res.status(403)
		   .send(`Sorry ${cert.subject.CN}, certificates from ${cert.issuer.CN} are not welcome here.`)
  } else {

		res.status(401)
		   .send(`Sorry, but you need to provide a client certificate to continue.`)
  }


});

app.all('/oauth/token', app.oauth.grant());

app.get('/', app.oauth.authorise(), function (req, res) {
  // res.send('Secret area');
});

app.use(app.oauth.errorHandler());

// app.listen(3000);
// app.listen(8080);
var httpServer = http.createServer(app);
var httpsServer = https.createServer(options, app);

httpServer.listen(8080);
httpsServer.listen(8443);
