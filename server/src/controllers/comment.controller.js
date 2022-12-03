
const { Comment } = require("../models")

module.exports.index = async (req, res) => {

    const idProduct = req.query.idProduct

    const comment_product = await Comment.find({ idProduct: idProduct })

    res.json(comment_product)

}

module.exports.send = async (req, res) => {

    const idProduct = req.query.idProduct

    const idUser = req.query.idUser

    const fullname = req.query.fullname

    const content = req.query.content

    const star = parseInt(req.query.star)

    let arrayStar = []

    for (let i = 0; i < star; i++) {
        arrayStar.push("fas fa-star text-warning")
    }

    let star1 = ''
    let star2 = ''
    let star3 = ''
    let star4 = ''
    let star5 = ''

    for (let i = 0; i < arrayStar.length; i++) {
        if (i === 0) {
            star1 = arrayStar[i]
        }
        if (i === 1) {
            star2 = arrayStar[i]
        }
        if (i === 2) {
            star3 = arrayStar[i]
        }
        if (i === 3) {
            star4 = arrayStar[i]
        }
        if (i === 4) {
            star5 = arrayStar[i]
        }
    }

    const data = {
        idProduct: idProduct,
        idUser: idUser,
        fullname: fullname,
        content: content,
        star1: star1,
        star2: star2,
        star3: star3,
        star4: star4,
        star5: star5,
    }

    Comment.insertMany(data)

    res.send("Thanh Cong")

}