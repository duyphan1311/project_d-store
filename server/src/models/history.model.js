const mongoose = require('mongoose')
const { schemaOptions } = require('./modelOptions')

const historySchema = mongoose.Schema({
    idUser: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    cart: {
        type: Array,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    total: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    delivery: {
        type: Boolean,
        required: true
    }
}, schemaOptions)

module.exports = mongoose.model('History', historySchema)