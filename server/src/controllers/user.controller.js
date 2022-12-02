
const { User } = require('../models')

module.exports.index = async (req, res) => {

    const users = await User.find()

    res.json(users)

}

module.exports.detail = async (req, res) => {

    const id = req.params.id

    const users = await User.findOne({ _id: id })

    res.json(users)

}

module.exports.signup = async (req, res) => {

    const fullname = req.body.fullname
    const email = req.body.email
    const password = req.body.password
    const phone = req.body.phone
    const role = req.body.role || 0

    try {
        let customer = await User.findOne({ email: email })
        if (customer) return res.status(403).json('Email đã được sử dung!')
        const newCustomer = new User({
            fullname: fullname,
            email: email,
            password: password,
            phone: phone,
            role: role
        })
        await newCustomer.save();
        res.status(200).json('Đăng ký tài khoản  thành công!')
    } catch (err) {
        console.log(err);
        return false
    }

}

