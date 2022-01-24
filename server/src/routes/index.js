const router = require('express').Router()

router.use('/admin', require('./accountRoute'))
router.use('/account', require('./accountRoute'))
router.use('/role', require('./roleRoute'))
router.use('/employee', require('./employeeRoute'))
router.use('/category', require('./categoryRoute'))
router.use('/supplier', require('./supplierRoute'))

module.exports = router