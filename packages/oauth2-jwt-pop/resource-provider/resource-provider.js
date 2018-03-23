const bearerToken = require('express-bearer-token');
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var https = require('https');
var hash = require('hash.js');
var fs = require('fs');
var jwt = require('jsonwebtoken');
var authorizationHeader = require('authorization-header');

var hscert = fs.readFileSync('./../certificate/cert1.pem')
var hskey = fs.readFileSync('./../certificate/key1.pem');
var cacert = fs.readFileSync('./../certificate/cert.pem')
var JWT_SECRET_FOR_ACCESS_TOKEN = 'XT6PRpRuehFsyMa2';

var options = {
    key: hskey,
    cert: hscert,
    requestCert: true,
    rejectUnauthorized: false,
    ca: cacert
};

var cnf;
var rawder;
var x5ts256;
var decoded;
var eq;
var app = express();


// app.use(bearerToken());
app.use(authorizationHeader({
  type: 'Jpop',
  attachTo: 'token'
}));

app.use(function (req, res, next) {
  rawDer = req.connection.getPeerCertificate().raw;
  x5ts256 = hash.sha256().update(rawDer).digest('base64url');
  if (req.client.authorized) {
    try{
      decoded = jwt.verify(req.token, JWT_SECRET_FOR_ACCESS_TOKEN);
      cnf = decoded['cnf']['x5t#s256'];
      // direct comparison of 2 bas64url encoded strings is not working
      eq = parseInt(cnf) -parseInt(x5ts256);
      if(eq == 0){
        next();
     }else{
        // res.status
        // console.log('entered here');
        res.status(403)
          .send("Client Authentication failed");
     }
    } catch(err){
      return res.status(403).json({ error: 'No credentials sent!' });
    }
		// res.send(`Hello ${cert.subject.CN}, your certificate was issued by ${cert.issuer.CN}!`);
  } else if (cert.subject) {
		res.status(403)
		   .send(`Sorry ${cert.subject.CN}, certificates from ${cert.issuer.CN} are not welcome here.`)
  } else {
		res.status(401)
		   .send(`Sorry, but you need to provide a client certificate to continue.`)
  }


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
