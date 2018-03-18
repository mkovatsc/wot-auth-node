"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var coap = require("node-coap-client");
var cborMap = require("./cbor-functions");
var code;
function dtlsClient(payload, ipAddress, url) {
    return new Promise(function (resolve, reject) {
        coap.CoapClient
            .request(url, 'post', payload)
            .then(function (response) {
            code = response.code.toString();
            if (code === '2.01') {
                resolve('Success');
                return cborMap.cborToParams(response.payload);
            }
            else {
                reject('Error: ' + response.payload.toString() + code);
            }
        })
            .catch(function (err) { reject('Error'); /* handle error */ });
    });
}
exports.dtlsClient = dtlsClient;
