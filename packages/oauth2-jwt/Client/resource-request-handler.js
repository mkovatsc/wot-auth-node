const popsicle = require('popsicle');
var fs = require('fs');

var hscert = fs.readFileSync('./../certificate/cert1.pem')

var resourceRequest = (token)=>{
  return new Promise(function(resolve,reject){
    popsicle.request({
      method: 'GET',
      url: 'https://localhost:8444/temperature',
      headers: {
        'authorization': 'Bearer '+ token
      },
      transport: popsicle.createTransport({
        ca: hscert
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
