const express = require('express')
const router = express.Router()
const { productController } = require('../controllers')
const tokenHandler = require('../handlers/tokenHandler')

router.post('/',
    tokenHandler.verifyManegerToken,
    productController.create
)
router.put('/:id',
    tokenHandler.verifyManegerToken,
    productController.update
)
router.delete('/:id',
    tokenHandler.verifyManegerToken,
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