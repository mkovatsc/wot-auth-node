var fs = require('fs');
var ClientOAuth2 = require('client-oauth2');

var tokenRequest = ()=>{
  return new Promise(function(resolve,reject){

    var token;
    var hscert = fs.readFileSync('../certificate/cert.pem')

    var githubAuth = new ClientOAuth2({
      clientId: 'thom',
      clientSecret: 'nightworld',
      // accessTokenUri: 'http://localhost:3000/oauth/token',
      accessTokenUri: 'https://localhost:8443/oauth/token',
      authorizationUri: 'https://github.com/login/oauth/authorize',
      redirectUri: 'http://example.com/auth/github/callback',
      // scopes: ['notifications', 'gist']
    })

    githubAuth.credentials.getToken()
      .then(function (user) {
        console.log("Access Token: "+user.accessToken+"\n"+"Refresh Token: "+user.refreshToken) //=> { accessToken: '...', tokenType: 'bearer', ... }
        token = user.accessToken;
        if(token != null)
        resolve(token);
        else
        reject('undefined')
      })
    })
  }
module.exports = {
  tokenRequest
}
