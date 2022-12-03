var express = require('express')

var router = express.Router()

const { productController } = require('../controllers')

router.get('/', productController.index)

router.post('/', productController.create)

router.put('/:id', productController.update)

router.delete('/:id', productController.delete)

router.get('/category', productController.category)

router.get('/pagination', productController.pagination)

router.get('/:id', productController.detail)


module.exports = router