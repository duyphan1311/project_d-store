const express = require('express')
const router = express.Router()
const { orderDetailsController } = require('../controllers')
const tokenHandler = require('../handlers/tokenHandler')

router.post('/',
    tokenHandler.verifyToken,
    orderDetailsController.create
)
router.put('/:id',
    tokenHandler.verifyToken,
    orderDetailsController.update
)
router.get('/:id',
    tokenHandler.verifyToken,
    orderDetailsController.getOne
)

module.exports = router