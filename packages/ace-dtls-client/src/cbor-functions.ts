import cbor = require('cbor');
import assert = require('assert');
import constant = require('./constants');

export function cborMapping (parameters):any{
  return new Promise((resolve,reject)=>{
    var cborMap = cbor.encode(parameters);
    if(cborMap === null){
      reject("Null Error");
    }else {

      resolve(cborMap);
    }

  })
}

export function cborToParams (cborObject):any{
  return new Promise((resolve,reject)=>{
    cbor.decodeFirst(cborObject, function(error, obj) {
      if(error!= null){
        reject('error');
      }
      else {
           resolve(obj);
      }
    });

  })
}
