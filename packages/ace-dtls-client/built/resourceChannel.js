"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var coap = require("node-coap-client");
var prompt = require('prompt-sync')();
var coapClient = coap.CoapClient;
var url;
function actionRequest(kid, ipAddress, url, preSharedKey) {
    return new Promise(function (resolve, reject) {
        console.log(ipAddress + " " + kid + " " + preSharedKey);
        coapClient.setSecurityParams(ipAddress, { psk: (_a = {}, _a[kid] = preSharedKey, _a) });
        var resource = prompt("Enter Resource name. To exit enter 'Exit': ");
        if (resource === 'Exit') {
            process.exit();
        }
        url = 'coaps://192.168.1.25:5688/' + resource;
        console.log(url);
        coapClient.
            request(url, 'get')
            .then(function (response) {
            console.log(response.payload.toString());
            // resolve(response);
            // resource = prompt("Enter Resource name. To exit enter 'Exit': ");//dummy prompt
        })
            .catch(function (err) { reject('Error'); /* handle error */ });
        var _a;
    });
}
exports.actionRequest = actionRequest;
