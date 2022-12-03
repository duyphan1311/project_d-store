
const { Cart, Product } = require('../models')

module.exports.index = async (req, res) => {

    const idUser = req.query.idUser
    const carts = await Cart.find({ idUser: idUser })

    res.json(carts)

}

module.exports.addToCart = async (req, res) => {

    const idUser = req.query.idUser

    const idProduct = req.query.idProduct

    const count = req.query.count

    const product = await Product.findOne({ _id: idProduct })

    const carts = await Cart.findOne({ idUser: idUser, idProduct: idProduct })

    if (!carts) {

        const dataInsert = {
            idUser: idUser,
            idProduct: idProduct,
            nameProduct: product.name,
            priceProduct: product.price,
            count: count,
            img: "ladal",
        }

        Cart.insertMany(dataInsert)

        res.send("Thanh Cong!")

    } else {

        carts.count += parseInt(count)

        carts.save()

        res.send("Thanh Cong!")

    }

}

module.exports.deleteToCart = async (req, res) => {

    const idUser = req.query.idUser

    const idProduct = req.query.idProduct

    var cart = await Cart.findOne({ idUser: idUser, idProduct: idProduct })

    cart.delete()

    res.send("Thanh Cong!")

}

module.exports.updateToCart = async (req, res) => {

    const idUser = req.query.idUser

    const idProduct = req.query.idProduct

    const count = req.query.count

    var cart = await Cart.findOne({ idUser: idUser, idProduct: idProduct })

    cart.count = count

    cart.save()

    res.send("Update Thanh Cong")

}

