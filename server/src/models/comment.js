const mongoose = require('mongoose')
const { schemaOptions } = require('./modelOptions')
const Schema = mongoose.Schema

const commentSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    prevID: {
        type: Schema.Types.ObjectId,
        required: true,
        default: null
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
}, schemaOptions)

module.exports = mongoose.model('Comment', commentSchema)