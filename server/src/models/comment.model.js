const mongoose = require('mongoose')
const { schemaOptions } = require('./modelOptions')

const commentSchema = mongoose.Schema({
    idUser: {
        type: String,
        required: true
    },
    idProduct: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    star1: {
        type: String,
        required: true
    },
    star2: {
        type: String,
        required: true
    },
    star3: {
        type: Number,
        required: true
    },
    star4: {
        type: String,
        required: true
    },
    star5: {
        type: String,
        required: true
    }
}, schemaOptions)

module.exports = mongoose.model('Comment', commentSchema)