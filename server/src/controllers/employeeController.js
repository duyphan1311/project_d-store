const CryptoJs = require('crypto-js')
const { Employee, Order, ReceiveNote, Supplier, Customer, Discount, Category, Product, Role } = require('../models')
const moment = require('moment')

exports.create = async (req, res) => {
    try {
        let employee = await Employee.findOne({ phone: req.body.phone })
        if (employee) return res.status(403).json('Số điện thoại đã được sử dung!')
        const newEmployee = await new Employee({
            name: req.body.name,
            gender: req.body.gender,
            birthDate: moment(req.body.birthDate, "DD/MM/YYYY").toDate(),
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
            hireDate: moment(req.body.hireDate, "DD/MM/YYYY").toDate(),
            title: req.body.title,
            password: CryptoJs.AES.encrypt(
                req.body.password,
                process.env.PASSWORD_SECRET_KEY
            ),
            role: req.body.roleID
        })
        await newEmployee.save();
        res.status(200).json({
            newEmployee
        })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.update = async (req, res) => {
    try {
        const updateEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            }
        )
        res.status(200).json(updateEmployee)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.delete = async (req, res) => {
    try {
        const { id } = req.params
        await Order.updateMany({ employee: id }, { employee: null })
        await ReceiveNote.updateMany({ employee: id }, { employee: null })
        await Employee.findByIdAndDelete(id);
        res.status(200).json('Deleted');
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.getAll = async (req, res) => {
    try {
        const list = await Employee.find({}).sort('-createAt').populate('role')
        res.status(200).json(list)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.getOne = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id).populate('role')
        res.status(200).json(employee)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.getAllReciveNoteByEmployee = async (req, res) => {
    try {
        const list = await ReceiveNote.find({ employee: req.params.employeeID }).populate('employee').populate('supplier')
        res.status(200).json(list)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.getOneReciveNoteByEmployee = async (req, res) => {
    try {
        const note = await ReceiveNote.find({ employee: req.params.employeeID, _id: req.params.receiveNoteID }).populate('employee').populate('supplier')
        res.status(200).json(note)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.getAllOrderByEmployee = async (req, res) => {
    try {
        const list = await Order.find({ employee: req.params.employeeID }).populate('customer').populate('employee')
        res.status(200).json(list)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.getOneOrderByEmployee = async (req, res) => {
    try {
        const order = await Order.find({ employee: req.params.employeeID, _id: req.params.orderID }).populate('customer').populate('employee')
        res.status(200).json(order)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

//Manager controller
exports.summary = async (req, res) => {
    try {
        const totalEmployee = await Employee.find({}).count()
        const totalProduct = await Product.find({}).count()
        const totalSupplier = await Supplier.find({}).count()
        const totalCategory = await Category.find({}).count()
        const totalDiscount = await Discount.find({}).count()
        const totalCustomer = await Customer.find({}).count()
        const totalOrder = await Order.find({}).count()

        const manager = await Role.findOne({ name: 'manager' })
        const employee = await Role.findOne({ name: 'employee' })

        // count order which has been completed
        const orderCompleted = await Order.aggregate().match({
            status: 'completed'
        }).count('order')

        const orderProcessing = await Order.aggregate().match({
            status: 'processing'
        }).count('order')

        const orderShipping = await Order.aggregate().match({
            status: 'shipping'
        }).count('order')

        const totalManager = await Employee.aggregate().match({
            role: manager._id
        }).count('manager')

        const totalEmployeeRole = await Employee.aggregate().match({
            role: employee._id
        }).count('employee')

        const totalProductWithEachCategory = await Product.aggregate().group({
            _id: '$category',
            count: { $sum: 1 }
        })

        const totalProductWithEachSupplier = await Product.aggregate().group({
            _id: '$supplier',
            count: { $sum: 1 }
        })


        res.status(200).json({
            totalEmployee,
            totalProduct,
            totalSupplier,
            totalCategory,
            totalDiscount,
            totalCustomer,
            totalOrder,
            orderAnalyst: {
                totalOrder,
                orderCompleted,
                orderProcessing,
                orderShipping
            },
            employeeAnalyst: {
                totalEmployee,
                totalManager,
                totalEmployeeRole
            },
            categoryAnalyst: {
                totalCategory,
                totalProductWithEachCategory
            },
            supplierAnalyst: {
                totalSupplier,
                totalProductWithEachSupplier
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}