const { OrderDetails } = require('../models')

exports.create = async (req, res) => {
    const {
        discount,
        products,
        order
    } = req.body
    try {
        const newOrderDetails = await new OrderDetails({
            discount: discount,
            products: products,
            order: order
        })
        await newOrderDetails.save();
        res.status(200).json({
            newOrderDetails
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

exports.update = async (req, res) => {
    try {
        const updateOrderDetails = await OrderDetails.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            }
        )
        res.status(200).json(updateOrderDetails)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

exports.getOne = async (req, res) => {
    try {
        const orderDetails = await OrderDetails.findById(req.params.id)
        res.status(200).json(orderDetails)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}