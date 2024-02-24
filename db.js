const mongoose = require('mongoose')
require('dotenv').config()

const mongoUrl = process.env.MONGO_URL
const connectToDb = () => {
    mongoose.connect(mongoUrl).then(() => {
        console.log("Connected succesfully");
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = connectToDb