
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

    const fullname = req.query.fullname
    const email = req.query.email
    const password = req.query.password
    const phone = req.query.phone
    const role = req.query.role || 0

    try {
        let customer = await User.findOne({ email: email })
        if (customer) return res.status(403).json('Email đã được sử dung!')
        const data = {
            fullname: fullname,
            email: email,
            password: password,
            phone: phone,
            role: role
        }
        await User.insertMany(data)
        res.status(200).json('Đăng ký tài khoản  thành công!')
    } catch (err) {
        console.log(err);
        return false
    }

}

module.exports.update = async (req, res) => {
    try {
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            }
        )
        res.status(200).json(updateUser)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

module.exports.delete = async (req, res) => {
    try {
        const { id } = req.params
        await User.findByIdAndDelete(id);
        res.status(200).json('Deleted');
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}