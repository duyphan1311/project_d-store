const mongoose = require('mongoose')
const { schemaOptions } = require('./modelOptions')

const messagesSchema = mongoose.Schema({
    id_user1: {
        type: String,
        required: true
    },
    id_user2: {
        type: String,
        required: true
    },
    content: {
        type: Array,
        required: true
    }
}, schemaOptions)

module.exports = mongoose.model('Message', messagesSchema)