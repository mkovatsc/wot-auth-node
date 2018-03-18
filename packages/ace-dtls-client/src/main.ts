import cborMap = require('./cbor-functions');
import constant = require('./constants');
import requestToken = require('./requestToken');
import cbor = require('cbor');
import postToken = require('./postToken');
import resourceChannel = require('./resourceChannel');
import initReq = require('./initialRequest');
var params = new Map();
//
//
// params.set(constant.GRANT_TYPE,constant.GT_CLI_CRED);
// params.set(constant.SCOPE,'r_tmp rw_config');
// params.set(constant.AUD,'rs1');

params.set(constant.GRANT_TYPE,constant.GT_CLI_CRED);
params.set(constant.SCOPE,'r_temp r_helloWorld');
params.set(constant.AUD,'rs1');
// //The scope specifies the resources that the client s
//
let token:any;
let popKey:string;
let cnfParams:any;
let kid:any;
let asUri:string;

initReq.unauthRequest('coap://192.168.1.25:5687/temp').then((message)=>{
  asUri = message;
  return cborMap.cborMapping(params)
}).then((cborObject)=>{
      return requestToken.dtlsClient(cborObject,'192.168.1.25','coaps://192.168.1.25:5684/token',"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
}).then((keyObj)=>{
      popKey = keyObj.key;
      kid = keyObj.kid;
      return postToken.dtlsClient(keyObj.token,'192.168.1.25','coap://192.168.1.25:5687/authz-info');
}).then((message)=>{
      return resourceChannel.actionRequest(kid,'192.168.1.25','coaps://192.168.1.25:5688/temp',popKey);
}).then((message)=>{
      console.log(message.payload.toString());
}).catch( err => {
      console.log('Error:' + err);
})
//
//  })
// }
