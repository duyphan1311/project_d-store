const { Order, OrderDetails } = require('../models')
const moment = require('moment')

exports.create = async (req, res) => {
    const {
        orderDate,
        shipDate,
        status,
        address,
        customer,
        employee
    } = req.body
    try {
        const newOrder = await new Order({
            orderDate: moment(orderDate, "DD/MM/YYYY").toDate(),
            shipDate: moment(shipDate, "DD/MM/YYYY").toDate(),
            status: status,
            address: address,
            customer: customer,
            employee: employee
        })
        await newOrder.save();
        res.status(200).json({
            newOrder
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

exports.update = async (req, res) => {
    try {
        const updateOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            }
        )
        res.status(200).json(updateOrder)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

exports.delete = async (req, res) => {
    try {
        const { id } = req.params
        await OrderDetails.deleteOne()({ order: id })
        await Order.findByIdAndDelete(id);
        res.status(200).json('Deleted');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.getAll = async (req, res) => {
    try {
        const list = await Order.find({}).sort('-createAt')
        res.status(200).json(list)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.getOne = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        res.status(200).json(order)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}