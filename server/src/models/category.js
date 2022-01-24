const mongoose = require('mongoose')
const { schemaOptions } = require('./modelOptions')
const slug = require('mongoose-slug-generator')
const Schema = mongoose.Schema

mongoose.plugin(slug)

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        slug: 'name',
        unique: true
    }
}, schemaOptions)

module.exports = mongoose.model('Category', categorySchema)