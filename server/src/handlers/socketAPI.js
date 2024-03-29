const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const { Messenger } = require('../models')

const socketAPI = {
    io: io
}

io.on("connection", (socket) => {
    console.log(`Có người vừa kết nối, socketID: ${socket.id}`);

    //Server nhận key send_message với value data do người dùng gửi lên
    socket.on("send_message", (data) => {
        console.log(data.name + ": " + data.message);

        //Sau đó nó sẽ update lại database bên phía người nhận
        //Vì 1 bên gửi 1 bên nhận nên id_user đôi ngược nhau và category cũng vậy
        const newData = {
            id: Math.random().toString(),
            message: data.message,
            name: data.name,
            category: "receive",
        };

        console.log(newData.message);

        const postData = async () => {
            const messenger = await Messenger.findOne({
                id_user1: data.id_user2,
                id_user2: data.id_user1,
            });

            messenger.content.push(newData);

            messenger.save();
        };

        postData();

        //Xử lý xong server gửi ngược lại client thông qua socket với key receive_message
        socket.broadcast.emit("receive_message");
    });

    // Server nhận key send_order với value data do người dùng gửi lên
    // Phần này dùng để xử lý bên admin history biết được có người vừa đặt hàng
    socket.on('send_order', (data) => {
        console.log(data)

        //Xử lý xong server gửi ngược lại client admin thông qua socket với key receive_order
        socket.broadcast.emit("receive_order", data);
    })

})

module.exports = socketAPI