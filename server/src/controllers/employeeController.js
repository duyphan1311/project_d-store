const CryptoJs = require('crypto-js')
const { Employee, Role } = require('../models')
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
