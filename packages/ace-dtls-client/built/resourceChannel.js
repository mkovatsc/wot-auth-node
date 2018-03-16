"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var coap = require("node-coap-client");
var prompt = require('prompt-sync')();
var coapClient = coap.CoapClient;
function dtlsClient(kid, ipAddress, url, preSharedKey) {
    return new Promise(function (resolve, reject) {
        coapClient.setSecurityParams(ipAddress, { psk: (_a = {}, _a[kid] = preSharedKey, _a) });
        // coap.CoapClient.setSecurityParams(ipAddress, {psk:{"00":preSharedKey}});
        do {
            var resource = prompt("Enter Resource name. To exit enter 'Exit': "); //dummy prompt
            if (resource === 'Exit') {
                break;
            }
            url = 'coaps://192.168.1.25:5688/' + resource;
            coapClient.
                request(url, 'get')
                .then(function (response) {
                console.log(response.payload.toString());
                // resolve(response);
            })
                .catch(function (err) { reject('Error'); /* handle error */ });
        } while (resource !== 'Exit');
        var _a;
    });
}
exports.dtlsClient = dtlsClient;
