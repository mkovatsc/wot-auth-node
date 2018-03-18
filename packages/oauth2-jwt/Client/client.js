var ClientOAuth2 = require('client-oauth2');
var fs = require('fs');
const popsicle = require('popsicle');
const tr = require('./token-request.js')
const rquest = require('./resource-request-handler.js')
var token;


tr.tokenRequest().then((message)=>{
token = message;
return rquest.resourceRequest(token)
}).then((res)=>{
  console.log("Response Code: "+res.status); // => 200
  console.log("Resource: "+res.body); //=> { ... }
  // console.log(res.get('Content-Type')) //=> 'application/json'
}).catch((err)=>{
  console.log(err);
})
