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
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
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
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.delete = async (req, res) => {
    try {
        const { id } = req.params
        await ReceiveNote.findByIdAndDelete(id);
        res.status(200).json('Deleted');
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.getAll = async (req, res) => {
    try {
        const list = await ReceiveNote.find({}).sort('-createAt').populate('employee')
        res.status(200).json(list)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.getOne = async (req, res) => {
    try {
        const receiveNote = await ReceiveNote.findById(req.params.id).populate('employee')
        res.status(200).json(receiveNote)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}