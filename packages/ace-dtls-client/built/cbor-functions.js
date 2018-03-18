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
            resolve(cborMap);
        }
    });
}
exports.cborMapping = cborMapping;
function cborToParams(cborObject) {
    return new Promise(function (resolve, reject) {
        cbor.decodeFirst(cborObject, function (error, obj) {
            if (error != null) {
                reject('error');
            }
            else {
                resolve(obj);
            }
        });
    });
}
exports.cborToParams = cborToParams;
