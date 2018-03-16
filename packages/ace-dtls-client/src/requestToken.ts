import coap = require("node-coap-client");
import constant = require('./constants');
import cborMap = require('./cbor-functions');
import cbor = require('cbor');
let token:any;
let popKey:string;
let tokenParams:any;
let code:string;
let error:string;
let errorType: string;
let clientid:string;
let kid:string;
export function dtlsClient (payload,ipAddress,url,preSharedKey):any{
  return new Promise((resolve,reject)=>{
    clientid = "clientA";

    coap.CoapClient.setSecurityParams(ipAddress, {psk:{[clientid]:preSharedKey}});
  
    coap.CoapClient
        .request(
             url,
            'post',
             payload

        )
        .then(response => { /* handle response */
          code = response.code.toString();
          console.log('CoAP Response code: ' +code);
          return cborMap.cborToParams(response.payload);
      }).then((message)=>{
          if(message.has(constant.ERROR)){
            errorType = constant.errorCodes[message.get(constant.ERROR)];
            reject(errorType);
          } else {
            token = message.get(constant.ACCESS_TOKEN);
            kid = message.get(constant.CNF).get(1).get(2).toString('base64');

            popKey = message.get(constant.CNF).get(1).get(-1).toString('ascii');
            // console.log(popKey);
            return cborMap.cborMapping(token);
          }

      }).then((message)=>{
          resolve({ token:message,
                    key: popKey,
                    kid: kid,
          });
        }).catch(err => {
          reject('Error')/* handle error */
        })
      })
    }
