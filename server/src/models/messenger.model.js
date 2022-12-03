const mongoose = require('mongoose')
const { schemaOptions } = require('./modelOptions')

const messengerSchema = mongoose.Schema({
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

module.exports = mongoose.model('Messenger', messengerSchema)