"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var coap = require("node-coap-client");
function dtlsClient(payload, ipAddress, url, preSharedKey) {
    return new Promise(function (resolve, reject) {
        coap.CoapClient.setSecurityParams(ipAddress, { psk: { "clientA": preSharedKey } });
        // coap.setSecurityParams(ipAddress, {psk:{"Client1":"azertyuiopmlkjhgfdsqwxcvbnazerty"}});
        // coap.setSecurityParams(ipAddress, {psk:{"clientA":"hor/tWePQukDIaLGsc1X/g=="}});
        // coap.setSecurityParams(ipAddress, {psk:{"clientA":"AAAAAAAAAAAAAAAAAAAAAAAA"}});
        coap.CoapClient
            .request(url, 'post', payload)
            .then(function (response) {
            resolve(response);
        })
            .catch(function (err) { reject('Error'); /* handle error */ });
    });
}
exports.dtlsClient = dtlsClient;
