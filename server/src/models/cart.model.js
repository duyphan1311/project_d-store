const mongoose = require('mongoose')
const { schemaOptions } = require('./modelOptions')
const Schema = mongoose.Schema

const cartSchema = mongoose.Schema({
    idUser: {
        type: String,
        required: true
    },
    idProduct: {
        type: String,
        required: true
    },
    nameProduct: {
        type: String,
        required: true
    },
    priceProduct: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    }
}, schemaOptions)

module.exports = mongoose.model('Cart', cartSchema)