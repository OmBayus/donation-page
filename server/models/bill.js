const mongoose = require('mongoose')
const config = require("../utils/config")

const url = config.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
        console.log('connected to MongoDB')
  })
  .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
  })

const billSchema = new mongoose.Schema({
        name:String,
        msg:String,  
        token:String,
        amount:Number,
        isPaid:Boolean,
})


module.exports = mongoose.model('Bill', billSchema)