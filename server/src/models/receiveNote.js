const mongoose = require('mongoose')
const { schemaOptions } = require('./modelOptions')
const Schema = mongoose.Schema

const receiveNoteSchema = mongoose.Schema({
    product: {
        type: Array,
        required: true
    },
    receiptDate: {
        type: Date,
        required: true
    },
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    }
}, schemaOptions)

module.exports = mongoose.model('ReceiveNote', receiveNoteSchema)