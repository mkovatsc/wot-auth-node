"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cborMap = require("./cbor-functions");
var constant = require("./constants");
var requestToken = require("./requestToken");
var postToken = require("./postToken");
var resourceChannel = require("./resourceChannel");
var initReq = require("./initialRequest");
var params = new Map();
//
//
// params.set(constant.GRANT_TYPE,constant.GT_CLI_CRED);
// params.set(constant.SCOPE,'r_tmp rw_config');
// params.set(constant.AUD,'rs1');
params.set(constant.GRANT_TYPE, constant.GT_CLI_CRED);
params.set(constant.SCOPE, 'r_temp r_helloWorld');
params.set(constant.AUD, 'rs1');
// //The scope specifies the resources that the client s
//
var token;
var popKey;
var cnfParams;
var kid;
var asUri;
initReq.unauthRequest('coap://192.168.1.25:5687/temp').then(function (message) {
    asUri = message;
    return cborMap.cborMapping(params);
}).then(function (cborObject) {
    return requestToken.dtlsClient(cborObject, '192.168.1.25', 'coaps://192.168.1.25:5684/token', "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
}).then(function (keyObj) {
    popKey = keyObj.key;
    kid = keyObj.kid;
    token = keyObj.token;
    return postToken.dtlsClient(keyObj.token, '192.168.1.25', 'coap://192.168.1.25:5687/authz-info');
}).then(function (message) {
    return resourceChannel.actionRequest(kid, '192.168.1.25', 'coaps://192.168.1.25:5688/temp', popKey);
}).then(function (message) {
    console.log(message.payload.toString());
}).catch(function (err) {
    console.log('Error:' + err);
});
//
//  })
// }
