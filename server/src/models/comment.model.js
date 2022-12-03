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
        type: String
    },
    star2: {
        type: String
    },
    star3: {
        type: String
    },
    star4: {
        type: String
    },
    star5: {
        type: String
    }
}, schemaOptions)

module.exports = mongoose.model('Comment', commentSchema)