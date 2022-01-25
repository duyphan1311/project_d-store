const { ReceiveNote } = require('../models')
const moment = require('moment')

exports.create = async (req, res) => {
    const {
        products,
        receiptDate,
        employee
    } = req.body
    try {
        const newReceiveNote = await new ReceiveNote({
            products: products,
            receiptDate: moment(receiptDate, "DD/MM/YYYY").toDate(),
            employee: employee
        })
        await newReceiveNote.save();
        res.status(200).json({
            newReceiveNote
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

exports.update = async (req, res) => {
    try {
        const updateReceiveNote = await ReceiveNote.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            }
        )
        res.status(200).json(updateReceiveNote)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

exports.delete = async (req, res) => {
    try {
        const { id } = req.params
        await ReceiveNote.findByIdAndDelete(id);
        res.status(200).json('Deleted');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.getAll = async (req, res) => {
    try {
        const list = await ReceiveNote.find({}).sort('-createAt')
        res.status(200).json(list)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.getOne = async (req, res) => {
    try {
        const receiveNote = await ReceiveNote.findById(req.params.id)
        res.status(200).json(receiveNote)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}