const jsonwebtoken = require("jsonwebtoken");
const { Customer, Employee, Role } = require('../models');

const tokenDecode = (req) => {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        const bearer = bearerHeader.split(' ')[1];
        try {
            const tokenDecoded = jsonwebtoken.verify(
                bearer,
                process.env.TOKEN_SECRET_KEY
            );
            return tokenDecoded;
        } catch (error) {
            return false;
        }
    } else {
        return false;
    }
}

exports.verifyAdminToken = async (req, res, next) => {
    const tokenDecoded = tokenDecode(req);
    if (tokenDecoded) {
        const employee = await Employee.findById(tokenDecoded.id);
        if (!employee) return res.status(403).json('Không tìm thấy tài khoản!')
        const role = await Role.findById(employee.role)
        if (role.name !== 'admin') return res.status(401).json('Bạn cần quyền truy cập')
        req.employee = employee;
        next();
    } else {
        res.status(401).json('Bạn cần quyền truy cập');
    }
}

exports.verifyManagerToken = async (req, res, next) => {
    const tokenDecoded = tokenDecode(req);
    if (tokenDecoded) {
        const employee = await Employee.findById(tokenDecoded.id)
        if (!employee) return res.status(403).json('Không tìm thấy tài khoản!')
        const role = await Role.findById(employee.role)
        if (role.name !== 'manager') return res.status(401).json('Bạn cần quyền truy cập')
        req.employee = employee;
        next();
    } else {
        res.status(401).json('Bạn cần quyền truy cập');
    }
}

exports.verifyEmployeeToken = async (req, res, next) => {
    const tokenDecoded = tokenDecode(req);
    if (tokenDecoded) {
        const employee = await Employee.findById(tokenDecoded.id);
        if (!employee) return res.status(403).json('Không tìm thấy tài khoản!');
        req.employee = employee;
        next();
    } else {
        res.status(401).json('Bạn cần quyền truy cập');
    }
}

exports.verifyToken = async (req, res, next) => {
    const tokenDecoded = tokenDecode(req);
    if (tokenDecoded) {
        const employee = await Employee.findById(tokenDecoded.id);
        const customer = await Customer.findById(tokenDecoded.id);
        if (!employee || !customer) return res.status(403).json('Không tìm thấy tài khoản!');
        req.employee = employee;
        req.customer = customer;
        next();
    } else {
        res.status(401).json('Bạn cần quyền truy cập');
    }
}