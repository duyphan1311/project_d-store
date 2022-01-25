const express = require('express')
const router = express.Router()
const { cartController } = require('../controllers')
const tokenHandler = require('../handlers/tokenHandler')

router.post('/',
    tokenHandler.verifyToken,
    cartController.create
)
router.put('/:id',
    tokenHandler.verifyToken,
    cartController.update
)
router.delete('/:id',
    tokenHandler.verifyToken,
    cartController.delete
)
router.get('/:id',
    tokenHandler.verifyToken,
    cartController.getOne
)

module.exports = router