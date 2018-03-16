import coap = require("node-coap-client");
import constant = require('./constants');
import cborMap = require('./cbor-functions');
import cbor = require('cbor');

let code:string;
export function dtlsClient (payload,ipAddress,url):any{
  return new Promise((resolve,reject)=>{

    coap.CoapClient
        .request(
             url,
            'post',
             payload

        )
        .then(response => { /* handle response */
          code =response.code.toString();
          if(code === '2.01'){
            resolve('Success');
            return cborMap.cborToParams(response.payload);
          }else{
            reject('Error: '+ response.payload.toString() + code);
          }
        }).then((message)=>{


        })
        .catch(err => { reject('Error')/* handle error */ })
        ;

      })
    }
