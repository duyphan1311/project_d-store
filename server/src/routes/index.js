const router = require('express').Router()

router.use('/admin', require('./accountRoute'))
router.use('/account', require('./accountRoute'))
router.use('/role', require('./roleRoute'))
router.use('/employee', require('./employeeRoute'))
router.use('/category', require('./categoryRoute'))
router.use('/supplier', require('./supplierRoute'))
router.use('/cart', require('./cartRoute'))
router.use('/comment', require('./commentRoute'))
router.use('/discount', require('./discountRoute'))
router.use('/order', require('./orderRoute'))
router.use('/receive-note', require('./receiveNoteRoute'))
router.use('/order-details', require('./orderDetailsRoute'))
router.use('/product', require('./productRoute'))
router.use('/customer', require('./customerRoute'))

module.exports = router