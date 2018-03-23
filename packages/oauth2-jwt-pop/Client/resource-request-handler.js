const popsicle = require('popsicle');
var fs = require('fs');

var hscert = fs.readFileSync('../certificate/cert1.pem');
var client_cert = fs.readFileSync('../certificate/client_cert.pem');
var client_key = fs.readFileSync('../certificate/client_key.pem');


var resourceRequest = (token)=>{
  return new Promise(function(resolve,reject){
    popsicle.request({
      method: 'GET',
      url: 'https://localhost:8444/temperature',
      headers: {
        'authorization': 'Jpop '+ token
      },
      transport: popsicle.createTransport({
        ca: hscert,
        cert:client_cert,
        key:client_key
   })
    })
      // .use(popsicle.plugins.parse('json'))
      .then(function (res) {
        if(res != null){
          resolve(res);

        }
        else {
          reject('Error');
        }

        })
    })
  }

module.exports = {
  resourceRequest
}
