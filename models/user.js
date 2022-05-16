const mongoose = require('mongoose')

const userData = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    dob: {
        type: Date,
        required: true,
    }
})

module.exports = mongoose.model("user", userData)