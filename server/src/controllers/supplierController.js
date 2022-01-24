const { Supplier, Product } = require('../models')

exports.create = async (req, res) => {
    const {
        companyName,
        contactName,
        contactTitle,
        address,
        phone,
        email
    } = req.body
    try {
        const newSupplier = await new Supplier({
            companyName: companyName,
            contactName: contactName,
            contactTitle: contactTitle,
            address: address,
            phone: phone,
            email: email
        })
        await newSupplier.save();
        res.status(200).json({
            newSupplier
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

exports.update = async (req, res) => {
    try {
        const updateSupplier = await Supplier.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            }
        )
        res.status(200).json(updateSupplier)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

exports.delete = async (req, res) => {
    try {
        const { id } = req.params
        await Product.updateMany({ supplier: id }, { supplier: null })
        await Supplier.findByIdAndDelete(id);
        res.status(200).json('Deleted');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.getAll = async (req, res) => {
    try {
        const list = await Supplier.find({}).sort('-createAt')
        res.status(200).json(list)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.getOne = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id)
        res.status(200).json(supplier)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}