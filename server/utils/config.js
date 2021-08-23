require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const APIKEY = process.env.APIKEY
const SECRETKEY = process.env.SECRETKEY

module.exports = {
  MONGODB_URI,
  APIKEY,
  SECRETKEY,
  PORT
}