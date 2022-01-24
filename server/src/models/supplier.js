const mongoose = require('mongoose')
const { schemaOptions } = require('./modelOptions')
const Schema = mongoose.Schema

const supplierSchema = mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    contactName: {
        type: String,
        required: true
    },
    contactTitle: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
}, schemaOptions)

module.exports = mongoose.model('Supplier', supplierSchema)