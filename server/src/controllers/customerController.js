const { Customer, Order, OrderDetails } = require('../models')

exports.update = async (req, res) => {
    try {
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
        res.status(200).json(list)
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
