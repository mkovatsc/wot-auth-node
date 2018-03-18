import coap = require("node-coap-client");
import constant = require('./constants');
import cborMap = require('./cbor-functions');
import cbor = require('cbor');
var prompt = require('prompt-sync')();
var coapClient = coap.CoapClient;
var url:string;


export function actionRequest (kid,ipAddress,url,preSharedKey):any{
  return new Promise((resolve,reject)=>{

  console.log(ipAddress +" "+ kid +" "+preSharedKey);
  coapClient.setSecurityParams(ipAddress ,{psk:{[kid]:preSharedKey}});

  var resource = prompt("Enter Resource name. To exit enter 'Exit': ");

  if( resource === 'Exit'){
        process.exit();
  }



    url = 'coaps://192.168.1.25:5688/'+ resource;
    console.log(url);
    coapClient.
            request(
            url,
            'get'
        )
        .then(response => { /* handle response */


          console.log(response.payload.toString());
          // resolve(response);
          // resource = prompt("Enter Resource name. To exit enter 'Exit': ");//dummy prompt
         })
        .catch(err => { reject('Error')/* handle error */ })


      })
    }
