const express = require('express')
const router = express.Router()
const { supplierController } = require('../controllers')
const tokenHandler = require('../handlers/tokenHandler')

router.post('/',
    // tokenHandler.verifyAdminToken,
    supplierController.create
)
router.put('/:id',
    // tokenHandler.verifyAdminToken,
    supplierController.update
)
router.delete('/:id',
    // tokenHandler.verifyAdminToken,
    supplierController.delete
)
router.get('/',
    // tokenHandler.verifyAdminToken,
    supplierController.getAll
)
router.get('/:id',
    // tokenHandler.verifyAdminToken,
    supplierController.getOne
)

module.exports = router