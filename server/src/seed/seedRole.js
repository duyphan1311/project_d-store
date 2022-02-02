const { Role } = require('../models')

const role = [
    {
        name: 'admin',
        description: 'Toàn quyền với hệ thống.'
    },
    {
        name: 'manager',
        description: 'Có quyền quản lý sản phẩm, quản lý loại sản phẩm, quản lý nhà cung cấp, quản lý đơn hàng, quản lý nhập hàng và thống kê doanh thu.'
    },
    {
        name: 'employee',
        description: 'Có quyền quản lý sản phẩm, quyền quản lý đơn hàng.'
    }
]

exports.createRole = async () => {
    try {
        const count = await Role.countDocuments()
        if (count !== 0) {
            return true
        }
        role.forEach(element => {
            new Role({
                name: element.name,
                description: element.description
            }).save()
        })
    } catch (error) {
        console.log(error);
        return false
    }
}