import coap = require("node-coap-client");
import constant = require('./constants');
import cborMap = require('./cbor-functions');
import cbor = require('cbor');
var prompt = require('prompt-sync')();
var coapClient = coap.CoapClient;

export function dtlsClient (kid,ipAddress,url,preSharedKey):any{
  return new Promise((resolve,reject)=>{

  coapClient.setSecurityParams(ipAddress, {psk:{[kid]:preSharedKey}});

  do{
    var resource = prompt("Enter Resource name. To exit enter 'Exit': ");//dummy prompt
    if( resource === 'Exit'){
      break;
    }
    url = 'coaps://192.168.1.25:5688/'+ resource;

    coapClient.
            request(
            url,
            'get'
        )
        .then(response => { /* handle response */


          console.log(response.payload.toString());
          // resolve(response);
         })
        .catch(err => { reject('Error')/* handle error */ });

  } while( resource !== 'Exit');


      })
    }
