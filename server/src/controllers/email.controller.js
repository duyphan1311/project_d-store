
const mailer = require('../handlers/mailer')

const { Cart, History } = require('../models')

module.exports.sendmail = async (req, res) => {

    try {

        const to = req.query.to
        const subject = 'Hóa Đơn Đặt Hàng'

        const fullname = req.query.fullname
        const phone = req.query.phone
        const address = req.query.address
        const idUser = req.query.idUser
        const status = false

        const cartsUser = await Cart.find({ idUser: idUser })

        let total = 0

        cartsUser.map(value => {
            return total += parseInt(value.priceProduct) * parseInt(value.count)
        })

        const htmlHead = '<table style="width:50%">' +
            '<tr style="border: 1px solid black;"><th style="border: 1px solid black;">Tên Sản Phẩm</th><th style="border: 1px solid black;">Hình Ảnh</th><th style="border: 1px solid black;">Giá</th><th style="border: 1px solid black;">Số Lượng</th><th style="border: 1px solid black;">Thành Tiền</th>'

        let htmlContent = ""

        for (let i = 0; i < cartsUser.length; i++) {
            htmlContent += '<tr>' +
                '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' + cartsUser[i].nameProduct + '</td>' +
                '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;"><img src="' + cartsUser[i].img + '" width="80" height="80"></td>' +
                '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' + cartsUser[i].priceProduct + '$</td>' +
                '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' + cartsUser[i].count + '</td>' +
                '<td style="border: 1px solid black; font-size: 1.2rem; text-align: center;">' + (parseInt(cartsUser[i].priceProduct) * parseInt(cartsUser[i].count)) + '$</td><tr>'
        }

        const htmlResult = '<h1>Xin Chào ' + fullname + '</h1>' + '<h3>Phone: ' + phone + '</h3>' + '<h3>Address:' + address + '</h3>' +
            htmlHead + htmlContent + '<h1>Tổng Thanh Toán: ' + total + '$</br>' + '<p>Cảm ơn bạn!</p>'

        await mailer.sendMail(to, subject, htmlResult)



        let carts = []

        cartsUser.map(value => {
            return carts.push(value)
        })

        const data = {
            idUser: idUser,
            fullname: fullname,
            phone: phone,
            address: address,
            cart: carts,
            total: total,
            status: status
        }

        History.insertMany(data)

        Cart.deleteMany({ idUser: idUser }).then(function () {
            res.send("Thanh Cong")
        }).catch(function (error) {
            res.send(error);
        });


    } catch (error) {
        console.log(error)
        res.send(error)
    }

}