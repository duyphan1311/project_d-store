var express = require('express')
var router = express.Router()
const { userController } = require('../controllers')

router.get('/', userController.index)
router.get('/:id', userController.detail)
router.post('/signup', userController.signup)

module.exports = router