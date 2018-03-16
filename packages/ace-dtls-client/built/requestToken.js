"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var coap = require("node-coap-client");
var constant = require("./constants");
var cborMap = require("./cbor-functions");
var token;
var popKey;
var tokenParams;
var code;
var error;
var errorType;
var clientid;
var kid;
function dtlsClient(payload, ipAddress, url, preSharedKey) {
    return new Promise(function (resolve, reject) {
        clientid = "clientA";
        coap.CoapClient.setSecurityParams(ipAddress, { psk: (_a = {}, _a[clientid] = preSharedKey, _a) });
        // coap.setSecurityParams(ipAddress, {psk:{"Client1":"azertyuiopmlkjhgfdsqwxcvbnazerty"}});
        // coap.setSecurityParams(ipAddress, {psk:{"clientA":"hor/tWePQukDIaLGsc1X/g=="}});
        // coap.setSecurityParams(ipAddress, {psk:{"clientA":"AAAAAAAAAAAAAAAAAAAAAAAA"}});
        coap.CoapClient
            .request(url, 'post', payload)
            .then(function (response) {
            code = response.code.toString();
            console.log('CoAP Response code: ' + code);
            return cborMap.cborToParams(response.payload);
        }).then(function (message) {
            if (message.has(constant.ERROR)) {
                errorType = constant.errorCodes[message.get(constant.ERROR)];
                reject(errorType);
            }
            else {
                token = message.get(constant.ACCESS_TOKEN);
                kid = message.get(constant.CNF).get(1).get(2).toString('base64');
                // console.log(kid);
                // console.log(message.get(constant.CNF).get(1).get(-1).toString('base64'));
                popKey = message.get(constant.CNF).get(1).get(-1).toString('ascii');
                console.log(popKey);
                return cborMap.cborMapping(token);
            }
        }).then(function (message) {
            resolve({ token: message,
                key: popKey,
                kid: kid,
            });
        }).catch(function (err) {
            reject('Error'); /* handle error */
        });
        var _a;
    });
}
exports.dtlsClient = dtlsClient;
