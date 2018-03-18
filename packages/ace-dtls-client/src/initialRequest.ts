import coap = require("node-coap-client");
import constant = require('./constants');
import cborMap = require('./cbor-functions');
import cbor = require('cbor');
var prompt = require('prompt-sync')();
var coapClient = coap.CoapClient;
var url:string;


export function unauthRequest (rsUri):any{
  return new Promise((resolve,reject)=>{


    url = rsUri;


    coapClient.
            request(
            url,
            'get'
        )
        .then(response => { /* handle response */

          resolve(response.payload.toString());
         })
        .catch(err => { reject('Error')/* handle error */ })


      })
    }
