const express = require('express')
const router = express.Router()
const { supplierController } = require('../controllers')
const tokenHandler = require('../handlers/tokenHandler')

router.post('/',
    tokenHandler.verifyManegerToken,
    supplierController.create
)
router.put('/:id',
    tokenHandler.verifyManegerToken,
    supplierController.update
)
router.delete('/:id',
    tokenHandler.verifyManegerToken,
    supplierController.delete
)
router.get('/',
    tokenHandler.verifyManegerToken,
    supplierController.getAll
)
router.get('/:id',
    tokenHandler.verifyManegerToken,
    supplierController.getOne
)

module.exports = router