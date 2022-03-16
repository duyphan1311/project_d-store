const { Customer, Order, OrderDetails } = require('../models')

exports.update = async (req, res) => {
    try {
        if (req.file.path) req.body.avatar = req.file.path.split('/').slice(length - 2)
        const updateCustomer = await Customer.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            }
        )
        res.status(200).json(updateCustomer)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.delete = async (req, res) => {
    try {
        const { id } = req.params
        const list = await Order.find({ customer: id })
        list.forEach(element => {
            OrderDetails.deleteOne({ order: element._id })
        });
        await Order.deleteMany({ customer: id })
        await Customer.findByIdAndDelete(id);
        res.status(200).json('Deleted');
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.getAll = async (req, res) => {
    try {
        const list = await Customer.find({}).sort('-createAt')
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
        const customer = await Customer.findById(req.params.id)
        res.status(200).json(customer)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.getAllOrderByCustomer = async (req, res) => {
    try {
        const list = await Order.find({ customer: req.params.customerID }).populate('customer')
        const page = parseInt(req.query.page) || 1
        const result = await pagination.pagination(list, page, 2)
        if (result == false) return res.status(404).json('Trang không tồn tại')
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.getOneOrderByCustomer = async (req, res) => {
    try {
        const order = await Order.find({ customer: req.params.customerID, _id: req.params.orderID }).populate('customer')
        res.status(200).json(order)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}