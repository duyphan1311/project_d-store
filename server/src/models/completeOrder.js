const mongoose = require('mongoose')
const { schemaOptions } = require('./modelOptions')
const Schema = mongoose.Schema

const completeOrderSchema = mongoose.Schema({
    address: {
        type: String,
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
    },
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
        required: true
    }
}, schemaOptions)

module.exports = mongoose.model('CompleteOrder', completeOrderSchema)