
const { Product } = require('../models')
const cloudinary = require('../handlers/cloudinary')
const appRoot = require('app-root-path')

//Get All Product
module.exports.index = async (req, res) => {

    const products = await Product.find()

    res.status(200).json(products)

}
const cloudinaryImageUploadMethod = async file => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (err, res) => {
            if (err) return res.status(500).send("upload image error")
            resolve({
                res: res.secure_url
            })
        }
        )
    })
}

//Hàm thêm sản phẩm
module.exports.create = async (req, res) => {
    const {
        name,
        price,
        img1, img2, img3, img4,
        category
    } = req.body

    try {
        const newProduct = await new Product({
            name: name,
            price: price,
            img1: img1,
            img2: img2,
            img3: img3,
            img4: img4,
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

module.exports.update = async (req, res) => {
    try {
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

module.exports.delete = async (req, res) => {
    try {
        const { id } = req.params
        await Product.findByIdAndDelete(id);
        res.status(200).json('Deleted');
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
//Get Category Product
module.exports.category = async (req, res) => {

    const category = req.query.category

    const products = await Product.find({ category: category })

    res.status(200).json(products)
}

//Get Detail Product
module.exports.detail = async (req, res) => {

    const id = req.params.id

    const products = await Product.findOne({ _id: id })

    res.status(200).json(products)
}

//Pagination Phát Triển Thêm Chức năng Search và Phân Loại Sản Phẩm
module.exports.pagination = async (req, res) => {

    //Lấy page từ query
    const page = parseInt(req.query.page) || 1

    //Lấy số lượng từ query
    const numberProduct = parseInt(req.query.count) || 1

    //Lấy key search từ query
    const keyWordSearch = req.query.search

    //Lấy category từ query
    const category = req.query.category

    //Lấy sản phẩm đầu và sẩn phẩm cuối
    var start = (page - 1) * numberProduct
    var end = page * numberProduct

    var products

    //Phân loại điều kiện category từ client gửi lên
    if (category === 'all') {
        products = await Product.find()
    } else {
        products = await Product.find({ category: category })
    }

    var paginationProducts = products.slice(start, end)


    if (!keyWordSearch) {
        res.status(200).json(paginationProducts)

    } else {
        var newData = paginationProducts.filter(value => {
            return value.name.toUpperCase().indexOf(keyWordSearch.toUpperCase()) !== -1 ||
                value.price.toUpperCase().indexOf(keyWordSearch.toUpperCase()) !== -1 || value.category.toUpperCase().indexOf(keyWordSearch.toUpperCase()) !== -1
        })

        res.status(200).json(newData)
    }
}