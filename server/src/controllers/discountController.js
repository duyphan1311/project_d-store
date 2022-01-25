const { Discount, Cart, OrderDetails } = require('../models')
const moment = require('moment')

exports.create = async (req, res) => {
    const {
        voucher,
        discount,
        description,
        expireDate
    } = req.body
    try {
        const newDiscount = await new Discount({
            voucher: voucher,
            discount: discount,
            description: description,
            expireDate: moment(expireDate, "DD/MM/YYYY").toDate()
        })
        await newDiscount.save();
        res.status(200).json({
            newDiscount
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

exports.update = async (req, res) => {
    try {
        const updateDiscount = await Discount.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            }
        )
        res.status(200).json(updateDiscount)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

exports.delete = async (req, res) => {
    try {
        const { id } = req.params
        await Cart.updateMany({ discount: id }, { discount: null })
        await OrderDetails.updateMany({ discount: id }, { discount: null })
        await Discount.findByIdAndDelete(id);
        res.status(200).json('Deleted');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.getAll = async (req, res) => {
    try {
        const list = await Discount.find({}).sort('-createAt')
        res.status(200).json(list)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.getOne = async (req, res) => {
    try {
        const discount = await Discount.findOne({ voucher: req.params.voucher })
        res.status(200).json(discount)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}