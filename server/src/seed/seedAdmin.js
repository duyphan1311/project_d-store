const CryptoJS = require('crypto-js');
const { Employee, Role } = require('../models');
const moment = require('moment')

const ad = {
    name: 'Phan Lê Duy',
    gender: 'Nam',
    birthDate: '13/11/2000',
    email: 'phanleduy131120@gmail.com',
    address: 'Bạc Liêu',
    avatar: null,
    hireDate: Date.now(),
    title: 'Admin'
}

exports.createAdmin = async () => {
    const phone = process.env.DEFAULT_ADMIN_PHONE;
    const password = process.env.DEFAULT_ADMIN_PASSWORD;
    try {
        const adminRole = await Role.findOne({ name: 'admin', phone: ad.phone })
        const admin = await Employee.findOne({ role: adminRole._id });
        if (admin !== null) {
            return true
        }
        const newAdmin = new Employee({
            name: ad.name,
            gender: ad.gender,
            birthDate: moment(ad.birthDate, "DD/MM/YYYY").toDate(),
            email: ad.email,
            address: ad.address,
            avatar: ad.avatar,
            hireDate: moment(ad.hireDate).toDate(),
            title: ad.title,
            phone: phone,
            password: CryptoJS.AES.encrypt(
                password,
                process.env.PASSWORD_SECRET_KEY
            ),
            role: adminRole._id
        });
        await newAdmin.save();
        console.log('--------------------------');
        console.log('Admin created with');
        console.log(`Phone => ${phone}`);
        console.log(`Password => ${password}`);
        console.log('--------------------------');
    } catch (err) {
        console.log(err);
        return false
    }
}