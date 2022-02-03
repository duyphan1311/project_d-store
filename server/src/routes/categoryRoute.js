const express = require('express')
const router = express.Router()
const { categoryController } = require('../controllers')
const tokenHandler = require('../handlers/tokenHandler')

router.post('/',
    tokenHandler.verifyManagerToken,
    categoryController.create
)
router.put('/:id',
    tokenHandler.verifyManagerToken,
    categoryController.update
)
router.delete('/:id',
    tokenHandler.verifyManagerToken,
    categoryController.delete
)
router.get('/',
    categoryController.getAll
)
router.get('/:id',
    categoryController.getOne
)

router.get('/:categorySlug',
    categoryController.getAllProductsByCategory
)

module.exports = router