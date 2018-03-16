"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cbor = require("cbor");
function cborMapping(parameters) {
    return new Promise(function (resolve, reject) {
        var cborMap = cbor.encode(parameters);
        if (cborMap === null) {
            reject("Null Error");
        }
        else {
            // console.log(cborMap);
            resolve(cborMap);
        }
    });
}
exports.cborMapping = cborMapping;
function cborToParams(cborObject) {
    return new Promise(function (resolve, reject) {
        cbor.decodeFirst(cborObject, function (error, obj) {
            // error != null if there was an error
            // obj is the unpacked object
            console.log(obj);
            if (obj === null) {
                reject('error');
            }
            else {
                // console.log(obj.get(constant.SCOPE).toString());
                // assert.ok(obj.has(constant.ACCESS_TOKEN));
                // assert.ok(obj.has(constant.PROFILE));
                // // assert.ok(obj.get(constant.PROFILE).toString() == 'coap_oscoap');
                // assert.ok(obj.has(constant.CNF));
                // // assert.ok(obj.has(constant.SCOPE));
                // // assert.ok(obj.get(constant.SCOPE).toString() == 'r_temp');
                // console.log(obj.get(constant.AUD).toString());
                // // console.log(obj.get(constant.ACCESS_TOKEN));
                resolve(obj);
                // resolve(cborObject);
            }
            // assert.ok(obj === true);
        });
    });
}
exports.cborToParams = cborToParams;
