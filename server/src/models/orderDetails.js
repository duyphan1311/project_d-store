const mongoose = require('mongoose')
const { schemaOptions } = require('./modelOptions')
const Schema = mongoose.Schema

const orderDetailsSchema = mongoose.Schema({
    discount: {
        type: Schema.Types.ObjectId,
        ref: 'Discount',
        required: true
    },
    products: {
        type: Array,
        required: true
    }
}, schemaOptions)

module.exports = mongoose.model('OrderDetails', orderDetailsSchema)