const express = require('express')
const router = express.Router()
const { categoryController } = require('../controllers')
const tokenHandler = require('../handlers/tokenHandler')

router.post('/',
    tokenHandler.verifyManegerToken,
    categoryController.create
)
router.put('/:id',
    tokenHandler.verifyManegerToken,
    categoryController.update
)
router.delete('/:id',
    tokenHandler.verifyManegerToken,
    categoryController.delete
)
router.get('/',
    tokenHandler.verifyToken,
    categoryController.getAll
)
router.get('/:id',
    tokenHandler.verifyToken,
    categoryController.getOne
)

module.exports = router