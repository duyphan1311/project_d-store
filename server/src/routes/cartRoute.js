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
    // tokenHandler.verifyAdminToken,
    cartController.delete
)
router.get('/:id',
    // tokenHandler.verifyAdminToken,
    cartController.getCart
)

module.exports = router