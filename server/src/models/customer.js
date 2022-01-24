const mongoose = require('mongoose')
const { schemaOptions } = require('./modelOptions')
const Schema = mongoose.Schema

const customerSchema = mongoose.Schema({
    name: {
        type: String,
        default: null,
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        default: null,
    },
    birthDate: {
        type: Date,
        default: null,
    },
    gender: {
        type: String,
        default: null,
    },
    address: {
        type: Array,
        default: null,
    },
    avatar: {
        type: String,
        default: null,
    },
    displayName: {
        type: String,
        default: null,
    },
    password: {
        type: String,
        required: true
    }
}, schemaOptions)

module.exports = mongoose.model('Customer', customerSchema)