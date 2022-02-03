const express = require('express')
const router = express.Router()
const { supplierController } = require('../controllers')
const tokenHandler = require('../handlers/tokenHandler')

router.post('/',
    tokenHandler.verifyManagerToken,
    supplierController.create
)
router.put('/:id',
    tokenHandler.verifyManagerToken,
    supplierController.update
)
router.delete('/:id',
    tokenHandler.verifyManagerToken,
    supplierController.delete
)
router.get('/',
    tokenHandler.verifyManagerToken,
    supplierController.getAll
)
router.get('/:id',
    tokenHandler.verifyManagerToken,
    supplierController.getOne
)

module.exports = router