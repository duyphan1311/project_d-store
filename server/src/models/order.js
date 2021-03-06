const mongoose = require('mongoose')
const { schemaOptions } = require('./modelOptions')
const Schema = mongoose.Schema

const orderSchema = mongoose.Schema({
    orderDate: {
        type: Date,
        required: true
    },
    shipDate: {
        type: Date,
        required: true
    },
    completeDate: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    details: {
        type: Schema.Types.ObjectId,
        ref: 'OrderDetails',
        required: true
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    }
}, schemaOptions)

module.exports = mongoose.model('Order', orderSchema)