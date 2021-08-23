const config = require("./config")
const Iyzipay = require('iyzipay');

var iyzipay = new Iyzipay({
    apiKey: config.APIKEY,
    secretKey: config.SECRETKEY,
    uri: 'https://sandbox-api.iyzipay.com'
});

module.exports = iyzipay