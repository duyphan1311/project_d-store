const mongoose = require('mongoose')
const { schemaOptions } = require('./modelOptions')
const slug = require('mongoose-slug-generator')
const Schema = mongoose.Schema

mongoose.plugin(slug)

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: Array,
        required: true
    },
    sales: {
        type: Number,
        default: 0
    },
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    slug: {
        type: String,
        slug: 'name',
        unique: true
    }
}, schemaOptions)

module.exports = mongoose.model('Product', productSchema)