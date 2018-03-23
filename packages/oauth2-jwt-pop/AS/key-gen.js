var jose = require('node-jose');

var keystore;

var jwk = {
  "kty": "oct",
  "use": "sig",
  "kid": "01",
  "k": "__i-KGkSrZPi-jiFSdLYpPC1dZzw1lNOdzQSPqD-7lzQH9MaN7rvd5H6x0-s4wqiNi-h-4aUJOYSue58sBPh3Q",
  "alg": "HS256"
}

console.log(JSON.stringify(jwk));


var genKeystore =() =>{
  return new Promise(function(resolve,reject){
    keystore = jose.JWK.createKeyStore();
    if(keystore === null)
     reject('Keystore failed');
    else {
      console.log('Keystore Generated');
      resolve(keystore);
    }
  })
}

var genKey =(keyName) =>{
    return new Promise(function(resolve,reject){
      var props = {
        kid: keyName,
        alg: 'A256GCM',
        use: 'enc'
      };

      keystore.generate("oct", 256, props).
              then(function(result) {
                key = result;
                if(key === null)
                  return reject('Key Generation Failed');
                else {
                      // console.log(key.kid);
                      resolve(key.kid + ' Generation Successfull');
                }
              });

    })
}

var getKey = (keyID) =>{
  return new Promise(function(resolve,reject){
    key = keystore.get(keyID);
    // console.log(key);
    if(key === null)
    return reject('Key couldnt be retrieved');
    else {
      resolve(key);
    }
  })

}

var importKey = (key) =>{
  return new Promise(function(resolve,reject){
      keystore.add(key).
      then(function(result) {
          if(result === null){
            reject('Null Result');

          } else{
            console.log(keystore);
            resolve(result);
          }

      });

  })
}

var createSign = ()=>{
  return new Promise(function(resolve,reject){
    jose.JWS.createSign(jwk).
            update('helloworld').
            final().
            then(function(result) {
              // {result} is a JSON object -- JWS using the JSON General Serialization
              resolve(result);
            });
  )}
}



module.exports ={
  genKeystore,
  genKey,
  getKey,
  importKey,
  createSign
}
