const { Category, Product } = require('../models')
const pagination = require('../handlers/pagination')
exports.create = async (req, res) => {
    const {
        name
    } = req.body
    const array = req.body.image.split('\\')
    const image = array[array.length - 1]
    try {
        const newCategory = await new Category({
            name: name,
            image: image
        })
        await newCategory.save();
        res.status(200).json({
            newCategory
        })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.update = async (req, res) => {
    try {
        const updateCategory = await Category.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            }
        )
        res.status(200).json(updateCategory)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.delete = async (req, res) => {
    try {
        const { id } = req.params
        await Product.updateMany({ category: id }, { category: null })
        await Category.findByIdAndDelete(id);
        res.status(200).json('Deleted');
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.getAll = async (req, res) => {
    try {
        const list = await Category.find({}).sort('-createAt')
        const page = parseInt(req.query.page) || 1
        const result = await pagination.pagination(list, page, 2)
        if (result == false) return res.status(404).json('Trang không tồn tại')
        res.status(200).json(list)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.getOne = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        res.status(200).json(category)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.getAllProductsByCategory = async (req, res) => {
    try {
        const category = await Category.findOne({ slug: req.params.categorySlug })
        const list = await Product.find({ category: category._id }).populate({ path: 'category' }, { path: 'supplier' })
        const page = parseInt(req.query.page) || 1
        const result = await pagination.pagination(list, page, 2)
        if (result == false) return res.status(404).json('Trang không tồn tại')
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}