const { Cart } = require('../models')

exports.create = async (req, res) => {
    const {
        products,
        discount,
        customer
    } = req.body
    try {
        const newCart = await new Cart({
            products: products,
            discount: discount,
            customer: customer
        })
        await newCart.save();
        res.status(200).json({
            newCart
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

exports.update = async (req, res) => {
    try {
        const updateCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            }
        )
        res.status(200).json(updateCart)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

exports.delete = async (req, res) => {
    try {
        const { id } = req.params
        await Cart.findByIdAndDelete(id);
        res.status(200).json('Deleted');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id)
        res.status(200).json(cart)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}