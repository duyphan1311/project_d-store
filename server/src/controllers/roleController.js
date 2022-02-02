const { Role, Employee } = require('../models')

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
        const list = await Role.find({}).sort('-createAt')
        res.status(200).json(list)
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