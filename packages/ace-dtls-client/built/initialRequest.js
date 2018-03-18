"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var coap = require("node-coap-client");
var prompt = require('prompt-sync')();
var coapClient = coap.CoapClient;
var url;
function unauthRequest(rsUri) {
    return new Promise(function (resolve, reject) {
        url = rsUri;
        coapClient.
            request(url, 'get')
            .then(function (response) {
            resolve(response.payload.toString());
        })
            .catch(function (err) { reject('Error'); /* handle error */ });
    });
}
exports.unauthRequest = unauthRequest;
