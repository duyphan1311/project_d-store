const mongoose = require('mongoose')
const { schemaOptions } = require('./modelOptions')
const Schema = mongoose.Schema

const cartSchema = mongoose.Schema({
    product: {
        type: Array,
        required: true
    },
    discount: {
        type: Schema.Types.ObjectId,
        ref: 'Discount',
        required: true
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    }
}, schemaOptions)

module.exports = mongoose.model('Cart', cartSchema)