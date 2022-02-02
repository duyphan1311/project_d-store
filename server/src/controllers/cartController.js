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
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
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
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.delete = async (req, res) => {
    try {
        const { id } = req.params
        await Cart.findByIdAndDelete(id);
        res.status(200).json('Deleted');
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.getOne = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id).populate('discount')
        res.status(200).json(cart)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}