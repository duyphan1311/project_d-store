const { Product } = require('../models')

exports.create = async (req, res) => {
    const {
        name,
        quantity,
        price,
        description,
        supplier,
        category
    } = req.body

    const images = req.files.map(image => image.path.split('/').slice(length - 2))
    try {
        const newProduct = await new Product({
            name: name,
            quantity: quantity,
            price: price,
            description: description,
            images: images,
            supplier: supplier,
            category: category
        })
        await newProduct.save();
        res.status(200).json({
            newProduct
        })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.update = async (req, res) => {
    try {
        if (req.files) req.body.images = req.files.map(image => image.path.split('/').slice(length - 2))
        const updateProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            }
        )
        res.status(200).json(updateProduct)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.delete = async (req, res) => {
    try {
        const { id } = req.params
        await Product.findByIdAndDelete(id);
        res.status(200).json('Deleted');
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.getAll = async (req, res) => {
    try {
        const list = await Product.find({}).sort('-createAt').populate({ path: 'category' }, { path: 'supplier' })
        const page = parseInt(req.query.page) || 1
        const result = await pagination.pagination(list, page, 2)
        if (result == false) return res.status(404).json('Trang không tồn tại')
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.getOne = async (req, res) => {
    try {
        const product = await Product.findById(req.params.slug).populate({ path: 'category' }, { path: 'supplier' })
        res.status(200).json(product)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.getAllCommentByProduct = async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug })
        const list = await Comment.find({ product: product }).sort('-createAt').populate({ path: 'prevID' }, { path: 'product' })
        const page = parseInt(req.query.page) || 1
        const result = await pagination.pagination(list, page, 2)
        if (result == false) return res.status(404).json('Trang không tồn tại')
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status
    }
}