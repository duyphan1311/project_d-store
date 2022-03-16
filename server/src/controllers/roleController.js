const { Role, Employee } = require('../models')
const pagination = require('../handlers/pagination')

exports.create = async (req, res) => {
    const {
        name,
        description
    } = req.body
    try {
        const newRole = await new Role({
            name: name,
            description: description
        })
        await newRole.save();
        res.status(200).json({
            newRole
        })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.update = async (req, res) => {
    try {
        const updateRole = await Role.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            }
        )
        res.status(200).json(updateRole)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.delete = async (req, res) => {
    try {
        const { id } = req.params
        await Employee.updateMany({ role: id }, { role: null })
        await Role.findByIdAndDelete(id);
        res.status(200).json('Deleted');
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.getAll = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const list = await Role.find({}).sort('-createAt')
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
        const role = await Role.findById(req.params.id)
        res.status(200).json(role)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}