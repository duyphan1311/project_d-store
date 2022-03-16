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
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
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
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.delete = async (req, res) => {
    try {
        const { id } = req.params
        await Product.updateMany({ supplier: id }, { supplier: null })
        await Supplier.findByIdAndDelete(id);
        res.status(200).json('Deleted');
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.getAll = async (req, res) => {
    try {
        const list = await Supplier.find({}).sort('-createAt')
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
        const supplier = await Supplier.findById(req.params.id)
        res.status(200).json(supplier)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}