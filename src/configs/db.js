const mongoose = require("mongoose")

require("dotenv").config()

let DB = process.env.MongoURI

const connect = () => {
    return mongoose.connect(DB)
}

module.exports= connect