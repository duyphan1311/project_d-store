const mongoose = require('mongoose')
const { schemaOptions } = require('./modelOptions')
const Schema = mongoose.Schema

const discountSchema = mongoose.Schema({
    voucher: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    expireDate: {
        type: Date,
        required: true
    }
}, schemaOptions)

module.exports = mongoose.model('Discount', discountSchema)