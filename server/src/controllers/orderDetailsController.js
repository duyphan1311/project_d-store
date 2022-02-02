const { OrderDetails } = require('../models')

exports.create = async (req, res) => {
    const {
        discount,
        products
    } = req.body
    try {
        const newOrderDetails = await new OrderDetails({
            discount: discount,
            products: products
        })
        await newOrderDetails.save();
        res.status(200).json({
            newOrderDetails
        })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
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
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.getOne = async (req, res) => {
    try {
        const orderDetails = await OrderDetails.findById(req.params.id).populate({ path: 'discount' })
        res.status(200).json(orderDetails)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}