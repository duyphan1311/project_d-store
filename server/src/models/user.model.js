const mongoose = require('mongoose')
const { schemaOptions } = require('./modelOptions')

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        required: true
    }
}, schemaOptions)

module.exports = mongoose.model('User', userSchema)