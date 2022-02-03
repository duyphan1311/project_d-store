const express = require('express')
const router = express.Router()
const { productController } = require('../controllers')
const tokenHandler = require('../handlers/tokenHandler')

router.post('/',
    tokenHandler.verifyManagerToken,
    productController.create
)
router.put('/:id',
    tokenHandler.verifyManagerToken,
    productController.update
)
router.delete('/:id',
    tokenHandler.verifyManagerToken,
    productController.delete
)
router.get('/',
    productController.getAll
)
router.get('/:slug',
    productController.getOne,
    productController.getAllCommentByProduct
)

module.exports = router