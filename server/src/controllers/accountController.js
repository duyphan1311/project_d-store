const CryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');
const { Employee, Customer } = require('../models');

exports.login = async (req, res) => {
    try {
        const employee = await Employee.findOne({
            phone: req.body.phone
        });
        const customer = await Customer.findOne({
            phone: req.body.phone
        });
        if (!employee && !customer) return res.status(401).json('Sai số điện thoại');
        const user = employee || customer
        const decryptedPass = CryptoJs.AES.decrypt(
            user.password,
            process.env.PASSWORD_SECRET_KEY
        ).toString(CryptoJs.enc.Utf8);
        if (decryptedPass !== req.body.password) return res.status(401).json('Sai mật khẩu đăng nhập');

        const token = jwt.sign({
            id: user._id
        }, process.env.TOKEN_SECRET_KEY);
        user.password = undefined;

        res.status(200).json({
            token,
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

exports.register = async (req, res) => {
    const {
        phone,
        password,
    } = req.body;
    try {
        let customer = await Customer.findOne({ phone: phone })
        if (customer) return res.status(403).json('Số điện thoại đã được sử dung!')
        const newCustomer = new Customer({
            phone: phone,
            password: CryptoJs.AES.encrypt(
                password,
                process.env.PASSWORD_SECRET_KEY
            )
        });
        await newCustomer.save();
        res.status(200).json('Đăng ký tài khoản  thành công!')
    } catch (error) {
        console.log(error);
        return false
    }
}