const router = require('express').Router()

router.use('/cart', require('./cart.router'))
router.use('/user', require('./user.router'))
router.use('/comment', require('./comment.router'))
router.use('/email', require('./email.router'))
router.use('/history', require('./history.router'))
router.use('/messenger', require('./messenger.router'))
router.use('/product', require('./product.router'))

module.exports = router