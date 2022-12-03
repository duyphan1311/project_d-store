var express = require('express')
var router = express.Router()
const { userController } = require('../controllers')

router.get('/', userController.index)
router.get('/:id', userController.detail)
router.delete('/:id', userController.delete)
router.put('/:id', userController.update)
router.post('/signup', userController.signup)

module.exports = router