const mongoose = require('mongoose')
const { schemaOptions } = require('./modelOptions')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    img1: {
        type: String,
        required: true
    },
    img2: {
        type: String,
        required: true
    },
    img3: {
        type: String,
        required: true
    },
    img4: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, schemaOptions)

module.exports = mongoose.model('Product', productSchema)