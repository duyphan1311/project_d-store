const express = require('express')
const router = express.Router()
const { categoryController } = require('../controllers')
const tokenHandler = require('../handlers/tokenHandler')

router.post('/',
    tokenHandler.verifyAdminToken,
    categoryController.create
)
router.put('/:id',
    tokenHandler.verifyAdminToken,
    categoryController.update
)
router.delete('/:id',
    tokenHandler.verifyAdminToken,
    categoryController.delete
)
router.get('/',
    tokenHandler.verifyAdminToken,
    categoryController.getAll
)
router.get('/:id',
    tokenHandler.verifyAdminToken,
    categoryController.getOne
)

module.exports = router