
const { History } = require('../models')

module.exports.index = async (req, res) => {

    const idUser = req.query.idUser

    const histories = await History.find({ idUser: idUser })

    res.json(histories)
}

module.exports.detail = async (req, res) => {

    const id = req.params.id

    const histories = await History.findOne({ _id: id })

    res.json(histories)

}

module.exports.history = async (req, res) => {

    const histories = await History.find()

    res.json(histories)

}